import React, { useEffect, useState } from 'react';

const GeoLocation = () => {
  const [location, setLocation] = useState(null);
  const [geoData, setgeoData] = useState({
	nombreCiudad:"",
	pais:"",
	region:"",
	temperatura:"",
	sensTerm:"",
	texto:"",
	icono:""
  })
  
  useEffect(() => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
            console.error('Error getting geolocation:', error.message);
        }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
	}, []);

	useEffect(() => {
		if (location) {
		const geolocation = `${location.latitude},${location.longitude}`;
        const url = process.env.REACT_APP_GEO_API_URL;
		fetch(`${url}${geolocation}`)
		.then(response => {return response.json()})
		.then(data => {
			setgeoData({
				nombreCiudad:data.location.name,
				pais:data.location.country,
				region:data.location.region,
				temperatura:data.current.temp_c,
				sensTerm:data.current.feelslike_c,
				texto:data.current.condition.text,
				icono:data.current.condition.icon
			})
		})
		  .catch(error => {
			console.error('Error:', error);
		  });
		}
	}, [location]);

  return (
    <div className='text-end me-3'>
			{location ? (
				<p><img src={geoData.icono} alt="icono"/>{geoData.temperatura}°C, {geoData.region}, {geoData.pais}</p>
			) : (
				<p>Getting location...</p>
			)}
    </div>
  );
};

export default GeoLocation;
