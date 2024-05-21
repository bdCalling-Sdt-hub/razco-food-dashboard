import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    replyFeedback: build.mutation({
      query: (feedbackData) => ({
        url: `feedback/${feedbackData?._id}`,
        method: "PATCH",
        body: feedbackData,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
    deleteFeedback: build.mutation({
      query: (feedbackData) => ({
        url: `feedback/${feedbackData?._id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
    feedbacks: build.query({
      query: () => {
        return {
          url: `feedback`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.feedback],
    }),
  }),
});

export const {
  useReplyFeedbackMutation,
  useFeedbacksQuery,
  useDeleteFeedbackMutation,
} = feedbackApi;
