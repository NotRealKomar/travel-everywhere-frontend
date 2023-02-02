import axios from 'axios';
import { useState } from 'react';
import { getApiUrl } from '../../helpers/getApiUrl';
import { LikesResponseData } from '../../models/LikesResponseData';

type UseLikeCounterProps = {
  placeId?: string | null;
  travelId?: string | null;
};

export const useLikeCounter = (props: UseLikeCounterProps) => {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const resetState = () => {
    setLikeCount(0);
    setIsLiked(false);
    setError('');
    setIsLoading(false);
  };

  const onSuccess = (data: LikesResponseData) => {
    resetState();

    setLikeCount(data.likesCount);
    setIsLiked(data.isLiked);
  };

  const handleOnClick = () => {
    if (!isLoading) {
      invokeLike();
    }
  };

  const invokeLike = async () => {
    setError('');
    setIsLoading(true);

    try {
      const url = !isLiked
        ? `${getApiUrl('app')}/like/add`
        : `${getApiUrl('app')}/like/remove`;

      const response = await axios.post<LikesResponseData>(
        url,
        {
          userId: localStorage.getItem('userId') ?? '',
          placeId: props.placeId,
          travelId: props.travelId,
        },
        {
          headers: {
            authorization: localStorage.getItem('accessToken') ?? '',
            'Content-type': 'application/json',
          },
        },
      );

      if (response.data) {
        onSuccess(response.data);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error as string);
    }
  };

  const loadLikesCount = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post<LikesResponseData>(
        `${getApiUrl('app')}/like/count`,
        {
          userId: localStorage.getItem('userId') ?? '',
          placeId: props.placeId,
          travelId: props.travelId,
        },
        {
          headers: {
            authorization: localStorage.getItem('accessToken') ?? '',
            'Content-type': 'application/json',
          },
        },
      );

      if (response.data) {
        onSuccess(response.data);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error as string);
    }
  };

  return {
    error,
    isLiked,
    isLoading,
    likeCount,
    handleOnClick,
    loadLikesCount,
  };
};
