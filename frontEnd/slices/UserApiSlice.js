import { apiSlice } from "./ApiSlices";

const USER_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url:`${USER_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        logout:builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: 'POST'
            
            })
        }),
        inscription: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: 'POST',
                body: data
            })
        }) ,
        updateUser:builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: 'PUT',
                body: data

            })
        })

        
    })

})

export const {useLoginMutation,useLogoutMutation,useInscriptionMutation,useUpdateUserMutation} = userApiSlice ;
