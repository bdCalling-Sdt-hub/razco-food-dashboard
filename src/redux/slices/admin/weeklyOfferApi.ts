import { baseApi } from "@/redux/api/baseApi";

export const weeklyDealApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createWeeklyDeal: build.mutation({
            query: (offerData) => {
                return{
                    url: `weekly-deal/create-weekly-deal`,
                    method: "POST",
                    body: offerData
                }
            }
        }),
        getWeeklyDeal: build.query({
            query: () => {
                return {
                    url: `weekly-deal`,
                    method: "GET"
                };
            }
        }),
        updateWeeklyDeal: build.mutation({
            query: ({ id, image }) => ({
                url: `weekly-deal/${id}`,
                method: "PATCH",
                body: image
            })
        }),
        deleteWeeklyDeal: build.mutation({
            query: (id) => ({
                url: `weekly-deal/${id}`,
                method: "DELETE"
            })
        })
    })
});

export const {
    useCreateWeeklyDealMutation,
    useUpdateWeeklyDealMutation,
    useGetWeeklyDealQuery,
    useDeleteWeeklyDealMutation
} = weeklyDealApi;