import "./App.css";
import {InfinitePeople} from "./people/InfinitePeople";
import {InfiniteSpecies} from "./species/InfiniteSpecies";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

function App() {
    const client = new QueryClient();
    return (
        <QueryClientProvider client={client}>

            <div className="App">
                <h1>Infinite SWAPI</h1>
                {/*<InfinitePeople/>*/}
                <InfiniteSpecies/>
            </div>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
}

export default App;
