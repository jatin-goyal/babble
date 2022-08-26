import React from 'react';
import Masonry from 'react-masonry-css';
import ArticleCard from '../home/ArticleCard';

const breakPointObj = {
  default: 3,
  3000: 3,
  2000: 3,
  1200: 3,
  1000: 2,
  700: 1,
};

const MasonryLayout = ({ articlesList }) => {
  return (
    <Masonry className="flex animate-slide-fwd " breakpointCols={breakPointObj}>
      {articlesList?.map(article => {
        return <ArticleCard article={article} key={article.articleId} />;
      })}
    </Masonry>
  );
};

export default MasonryLayout;
