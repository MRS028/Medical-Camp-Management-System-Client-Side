import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useFeedback = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: feedbacks = [],
    isLoading: loading,
    
    refetch,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedbacks");
      //   console.log("API Response:", res.data);
      return res.data;
    },
  });
  return [feedbacks, loading, refetch];
};

export default useFeedback;
