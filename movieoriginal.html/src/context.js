
import React, { useContext, useEffect, useState } from "react";


const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [isloading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({ show: "false", msg: "" });
    const [query, setQuery] = useState("avengers");
    const getMovies = async (url) => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
         
            if (data.Response === "True") {
                setIsLoading(false);
                
                setIsError({
                    show: false,
                    msg: ""
                });
                
                setMovie(data.Search);
            }
            else {
                let str="Incorrect IMDb ID."
                if(data.Error===str){
                    setIsError({
                        show:true,
                        msg:""
                    })
                }
                else{
                    setIsError({
                        show: true,
                        msg: data.Error
                    });
                }
                
            }
        }
        catch (error) {
            console.log(error);
        }
    }
 

    useEffect(() => {
       
        let timeerout = setTimeout(()=>{
            getMovies(`${API_URL}&s=${query}`)
        } , 800)

        return ()=>clearTimeout(timeerout);
    }, [query]);

    return <AppContext.Provider value={{ isloading, isError, movie ,query, setQuery}}>
        {children}
    </AppContext.Provider>;
};

const useGlobalContext = () => {
    return useContext(AppContext);
};


export { AppContext, AppProvider, useGlobalContext };