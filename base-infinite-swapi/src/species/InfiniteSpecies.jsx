import InfiniteScroll from "react-infinite-scroller";
import {Species} from "./Species";
import {useInfiniteQuery} from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
    const response = await fetch(url);
    return response.json();
};

export function InfiniteSpecies() {
    const {data, fetchNextPage, hasNextPage, isFetching, isError, isLoading} = useInfiniteQuery({
        queryKey: ["sw-species"],
        queryFn: ({pageParam = initialUrl}) => fetchUrl(pageParam),
        getNextPageParam: (lastPage) => lastPage.next || undefined,
    });

    if (isError) return <div>Error fetching data</div>;
    if (isLoading) return <div>Loading...</div>;


    return <>
        {isFetching && <div className="loading">Loading..</div>}
        <InfiniteScroll hasMore={hasNextPage} loadMore={() => {
            if (!isFetching) void fetchNextPage();
        }}>
            {data.pages.map(pageData => pageData.results.map((species) => <Species key={species.name}
                                                                                   name={species.name}
                                                                                   language={species.language}
                                                                                   averageLifespan={species.average_lifespan}/>))}
        </InfiniteScroll>
    </>
}
