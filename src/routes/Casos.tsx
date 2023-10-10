import { QueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { Await, Link, useLoaderData } from 'react-router-dom';

const getCasos = async () => {
    const TOKEN = "00D8M0000008iJD!ARYAQGARKp8vkfSvPOODVHAEPaw4WQxvV1BeCUs5YUj35JSvCZ2kz7RUuZkyuuJtPGvsLKDC5QR796ld39wq1X6le6xes1dI"
    const URL = "https://inacap--seidordev.sandbox.my.salesforce.com"
    const response = await fetch(
        //@ts-ignore
        `${config?.baseUrl}api/data`,
        {
            method: "POST",

            body: JSON.stringify({ instance_url: URL }),
            // mode: "cors",
            // credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
        },
    );

    if (!response.ok) {
        const error = await response.json().then((res) => res);
        return new Error(error);
        // Adjunta información extra al objeto de error.
    }

    const data = (await response.json().then((res) => res)) as [];
    return data;

}

const casosQuery = () => ({
    queryKey: ['casos'],
    queryFn: getCasos,
})

export const loader = (queryClient: QueryClient) => async () => {
    return await queryClient.fetchQuery(casosQuery())
}

export default function Casos() {
    const initialData = useLoaderData() as Awaited<
        ReturnType<ReturnType<typeof loader>>
    >
    console.log(initialData)

    return (
        <div>
            <Link to={'/'}>Volver al home</Link>
            Casos:
            <Suspense fallback={<h1>Loading...</h1>}>
                <Await resolve={initialData}>

                </Await>

                {JSON.stringify(initialData)}

            </Suspense>

        </div>
    )
}
