import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (query, page) => {
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const [list, setList] = useState([]);
   const [hasMore, setHasMore] = useState(false);

   const sendQuery = useCallback(async () => {
      try {
         await setLoading(true);
         await setError(false);
         const res = await axios.get("https://run.mocky.io/v3/b025c315-4340-42c9-b9bd-d3692809fdfa");
         await setList((prev) => [...new Set([...prev, ...res.data])])
         await setHasMore(res.data.data.length > 0);
         setLoading(false)
      } catch (e) {
         setError(e)
      }
   }, [query, page])

   useEffect(() => {
      sendQuery(query);
   }, [query, sendQuery, page]);

   return { loading, error, list, hasMore };
}

export default useFetch;
