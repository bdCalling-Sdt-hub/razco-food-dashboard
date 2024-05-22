import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const offerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOffer: build.mutation({
      query: (offerData) => ({
        url: `offer/create-offer`,
        method: "POST",
        body: offerData,
      }),
      invalidatesTags: [tagTypes.offer],
    }),
    getOffers: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `offer`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: any) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.offer],
    }),
    updateOffer: build.mutation({
      query: ({ id, formData }) => ({
        url: `/offer/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: [tagTypes.offer],
    }),
    deleteOffer: build.mutation({
      query: (id) => ({
        url: `offer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.offer],
    }),
  }),
});

export const {
  useCreateOfferMutation,
  useGetOffersQuery,
  useDeleteOfferMutation,
  useUpdateOfferMutation,
} = offerApi;
