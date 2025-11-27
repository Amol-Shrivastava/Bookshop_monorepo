const cds = require("@sap/cds");

class ReviewService extends cds.ApplicationService {
  init() {
    const { Reviews, Likes } = this.entities;

    this.before(["CREATE", "UPDATE"], Reviews, async (req) => {
      if (!req.data.rating) Math.round(Math.random() * 4) + 1;
    });

    this.on("like", (req) => {
      let { targetReview } = req.data,
        { user } = req;
      return cds
        .run([
          INSERT.into(Likes).entries({
            reviews_subject: targetReview.subject,
            reviews_reviewer: targetReview.reviewer,
            user: user.id,
          }),

          UPDATE(Reviews)
            .set({ liked: { "+=": 1 } })
            .where(targetReview),
        ])
        .then(() => {
          return req.notify({
            status: "success",
            message: "Review liked successfully.",
            review: targetReview,
          });
        })
        .catch(() => req.reject(400, "You already liked the review."));
    });

    this.on("unlike", async (req) => {
      const {
          targetReview: { subject, reviewer },
        } = req.data,
        { user } = req;

      let affectedRow = await DELETE.from(Likes).where({
        reviews_subject: subject,
        reviews_reviewer: reviewer,
        user: user.id,
      });

      if (affectedRow == 1) {
        await UPDATE(Reviews)
          .set({ liked: { "-=": 1 } })
          .where({ subject, reviewer });

        return req.reply({
          status: "success",
          message: "Review unliked.",
          review: { subject, reviewer },
        });
      }

      req.reject(400, "You have not liked this review yet.");
    });

    return super.init();
  }
}

module.exports = ReviewService;
