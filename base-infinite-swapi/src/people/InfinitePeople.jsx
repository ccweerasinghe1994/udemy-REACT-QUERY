import InfiniteScroll from "react-infinite-scroller";
import {Person} from "./Person";
import {useInfiniteQuery} from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
    const response = await fetch(url);
    return response.json();
};

export function InfinitePeople() {
    // TODO: get data for InfiniteScroll via React Query
    const {data, fetchNextPage, hasNextPage, isFetching, isError, isLoading} = useInfiniteQuery({
        queryKey: ["sw-people"],
        queryFn: ({pageParam = initialUrl}) => fetchUrl(pageParam),
        getNextPageParam: (lastPage) => lastPage.next || undefined,

    })

    if (isError) return <div>Error fetching data</div>
    if (isLoading) return <div>Loading...</div>


    return <>
        {isFetching && <div className="loading">Loading..</div>}
        <InfiniteScroll hasMore={hasNextPage} loadMore={() => {
            if (!isFetching) void fetchNextPage();
        }}>
            {data.pages.map(pageDate => pageDate.results.map((person) => <Person key={person.name} name={person.name}
                                                                                 eyeColor={person.eye_color}
                                                                                 hairColor={person.hair_color}/>))}
        </InfiniteScroll>
    </>
}
