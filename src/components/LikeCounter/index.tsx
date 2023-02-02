import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLikeCounter } from "./useLikeCounter";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from "@emotion/styled";

type LikeCounterProps = {
  placeId?: string | null;
  travelId?: string | null;
  disabled?: boolean;
};

const LikeCounterWrapper = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  padding: 8px 0;
`;

export const LikeCounter: React.FC<LikeCounterProps> = (props) => {
  const LikeCounter = styled(Box)`
    display: flex;
    align-items: center;
    flex-grow: 0;

    ${!props.disabled && 'cursor: pointer'}
    ${props.disabled && 'color: gray'}
  `;

  const {
    isLiked,
    likeCount,
    handleOnClick,
    loadLikesCount
  } = useLikeCounter(props);

  useEffect(() => {
    loadLikesCount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnLikeClick = () => {
    if (!props.disabled) {
      handleOnClick();
    }
  }

  return (
    <LikeCounterWrapper>
      <LikeCounter onClick={handleOnLikeClick}>
        {isLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
        <Typography paddingLeft="2px" display="inline">{likeCount}</Typography>
      </LikeCounter>
    </LikeCounterWrapper>
  )
}