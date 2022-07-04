import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BreweryDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  useEffect(() => {
    fetch(`https://api.openbrewerydb.org/breweries/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        setDetail(data);
      })
      .catch((error) => {
        console.error(error.message);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <h1>Brewery {id}</h1>
      <p>{detail.name}</p>
      <p>{detail.city}</p>
      <p>{detail.state}</p>
      <p>{detail.country}</p>
      <p>{detail.phone}</p>
      {detail.website_url && <p>{detail.website_url}</p>}
    </main>
  );
}
