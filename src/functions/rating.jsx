/**
 * This function calculates the average rating for a product and displays it using the StarRating component.
 * 
 * @param {Object} p - The product object. It should have a 'ratings' property which is an array of rating objects.
 * Each rating object should have a 'star' property which is the rating given by the user.
 * 
 * The function first checks if the product and its ratings exist. If they do, it creates an array of all the ratings.
 * It then calculates the total of all ratings using the reduce method.
 * 
 * The highest possible total (i.e., if all users gave a rating of 5) is calculated by multiplying the number of ratings by 5.
 * 
 * The average rating (result) is then calculated by dividing the total of all ratings by the highest possible total and multiplying by 5.
 * 
 * Finally, the function returns a div containing the StarRating component, which displays the average rating.
 */

import StarRating from "react-star-ratings";

const showAverageRating = (product) => {
  if (product?.ratings?.length) {
    let totalRating = product.ratings.reduce((acc, rating) => acc + rating.star, 0);
    let highestPossibleRating = product.ratings.length * 5;
    let averageRating = (totalRating * 5) / highestPossibleRating;

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating rating={averageRating} />
        </span>
      </div>
    );
  }
};

export default showAverageRating;
