import React from "react";
import "./Card.scss";

interface Item {
  id: number;
  albumId?: number;
  title: string;
  url: string;
  alt?: string;
  address?: string;
  money?: number;
}

function Card(props:Item) {
  return (
    <div className="Card">
      <div className="Card_header">
        <img
          className="avatar"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEUAAAD////t7e3u7u7+/v7s7Ozz8/P09PT4+Pj6+vqhoaGurq7ExMSmpqbe3t63t7e+vr7Ly8s3NzeRkZGZmZlTU1PV1dWGhoZISEisrKzc3NyUlJQtLS20tLTT09Pl5eV4eHgQEBB+fn5cXFweHh5paWk+Pj4lJSUWFhZkZGQwMDA7OztwcHBGRkZbW1tQUFBMcN30AAAOrUlEQVR4nO1d6XqrOAwtuNgmIXtu0rTZurfT7f3fbiDBBpIgS7ZJukR/Rt+dAj7Blo5kWVxcphKEjLEw+JXa5cUZ4U/X/gLCIJMoDMPol2oX4cmH0KwWXrBTT6OGNXZG+OM19gfW4cmH0Lgt/f3+8Izwp2tnTvPztTOn+fnaX0D4+9fhyYdw5jRnj39G+AfW4XFtKeOcsaPCPAKnSZ/EpZQ8jrrLQa/X6yfXKx4EUgqR/uene3yeYmCD9vT+v4tdefhaj9vdzXv9oQiDQMTd9vRqD1pVntftgZCC/UBOwxfvBnCFfI0HDa7DRm49GD2j4eXyvuCikbH49oepoVyNb6nwtvKYZCP65h5fssXQDt5WRivfhscrQiYnaxd4G7nqpXbnu3Ka5F/dsIfvo1ln0R8soyhadZPerDW6q7eyrczJ+FuHnmwpk/23Q6N9vpsNZObwt4POl2oqQko26I0O42wx/t04TZw87Y/zbdSPNK4asxQE1637AxjHgn8jj5/+WPvz870fxYJHiLtwKZLpy94N2vKbIMze0nQPXmb3CXdO53D3Zvcmw5TTfQdOEwb93ZF1Qrv7LV937nTnZR26Lmf5VR3Vumt9PxbI1g7GnnQ2N27+MAh61RFNV04BUXbDh8oNX10DLFePXzWD09BDkCAXVYwTt8XohFBeV/FF0ofjiXg8q9x35MRV7TlNFMYV63fPAm+BGOfj8q2vYn4aTlO2fLf9mPkMecTqs4yxa38/e04j5uWJJLiPCVrW4ooN61kvRluPz1elxz900ddSWAArJwmsF6MlQln28plfxrCWTMIo5FsXl7o/09iCpPSUd8vA0Y7TyHbp0QPzFZIPOqP3JxX6335N212ZUmvj08RH8ZzPNGw8GqcpWfP/OGznmBD96cG4aj0wP43JdXHBlZ25sfGHneKpj1loWH9FGhWvd5GVpC2NBiourYcnzHLw4PFl6Q2OQRMXBP35PqyyPAyk8bndCkTo9/SEUJbeYB/ijKmheNjHtCut2PTcgBe3uWqe00Si5KYS6Ape9dm1MorNzy3yB/cytcbNcpoSFe2CVwxQ+C6yhPdScui5EeNFhLammhsap4mCqBjZClr2wfgAllp5bsEhCQuKLAm89F09PguKbPYKfNIdBWAmLThjUYKY0AwqDWFczJYuZGTivcQN4j3CcyIo0o6r5jiNLN4MaGQkaYpq6cEjKHYLSGEaidMUNDEB/25iBXDDrutHwCKdcPyi2VK0PwyYHkoLnlCWAFOOA019Xn5+Ix4/0OzyHTYKa2uEhpxMMTe6eINKQKhzFm9ZlhvFsugC3rlg/C8UhLg5HbFi4BK+onYDCiNreCw6Jr5rgNNocriEwyU0lzksE7DahuvN8wRblYPlNAVHGRmmx25mniiv4H4M16TxRfj1+AVbG8KMIojdAG64EjAWobMLU88I9eKKDAgXrghvDGPRtIrhXAaS02hf3zHNfVzIBMizYSxC/eEndh1iFqxUhHsoDTfkrgBTXwcnnITenkqYN07D9U0nPAQnBU8Oj5oiM0PuJlYEdR578/j6xUylYdpzO85dkTtheMZS/eUCs9WPQjhStzQmZeWjO8I30w6WVH7/RfriNOrZM2MWRxpyaygxrXWmdxTaGLdvtqV65t1K88L2APAiNg5aTapnP5xG6l/MPO2d/X0m5sBBx1EJ9+DxuSL0z2bTFaxqBk2SgRGhnlZXsQeEsVpabW5GaBvdV6RvDo20dV8atwWMnIbpWMFkADLNMbDYSs+4DiOuUl3vwp3TrPN7zcxWK+LOrHTzJMS2m17wCFtq8ofFrcxE1xdCRCiwzv+4bZrSRo+vopU7TLDiB+ECg1AFikNnhGpTZIJC2KsbNUX6CISXgTrBASaSzZyGKc8zRNWXsd0iPisZoGIGNbnGjpxGOZ4FLvHjlGdTEpl/yixBnP/1g4FpmTiNypHGiGi6kjR2EFxVqVQJoYlh3wpEGCjG9onc7/HCSxFGO9W4WhFj7oJQWY7FEREOcQiZetYHXC1t4DQqEouxCdj9M2pkeUeYtI2mUkIunEZN0jeJyohEoXDMlmZygzyIoHMrCbPnNCpfcIM9xSJGdePGywJZBMiU0x+BIRTo8YtfCeODK6GWg1xjFnymKW46BLNHIEKdEDHkhkoIPQQXpmyX1sQ6vwJ0eBCn0WnSK0zglDtiZ4CfAmXSskhG1S4lYIYVsqUqrhhjrVsqzqkocKu7qqmMAhjYQZxGx7MJzkNtPCi5zGRX+qjlUPG+a2h8kMfXW67IPZANQuf4iXCcIcirT+fWCFWqAP/MS+dMjYGhVBGWBmjHafIinTf8yqjUvVnJiHK4UkVQIbgO62+jGM2UcNpBWFRDVeQW+1Ommg5H+1BECfnD/PqZOe2qNfeEaYvwNBWOdgBGAnh8zYr6+Gc6v8ILgsdnTO2WjgBWCSFUe4ETkDNUWZDlSfyyDPCHU9Tj1iDC2vnL1DpmcKKjnKfxkdVv4Q85izwF8U/YcZqypUJaNx95GgqDyrcrh6AtrZ+CKrLAeygv+xYjAr/Il/0tkNmBPL4qZCMg9PEObwgI1RAtEeY/0AMBoawdN146BIRqmoEI69fhenv1nNJUxQPCPmEdKuYMrsPa2/B8GT8RWIb8qB04Wib4A1w6CWHHaUSO8AM5ZU7g8QuEVh5f5c0oCLn7xkXqvfEIVZRviTB/h28EhJpH2Qui+ID4DuvXYZ6H+o+wDkPhHONTnqYRQrvGgC3N19QLqXGDayqKFB8W3sKO06jsLq2LiuNLZJSmDK4eX/1A2HrjrcYRhw7rJSH13VE/py1rU8wb00WnFHS5MLeW+UhpBWFu7qHNfIjTqK21CWVlZCGUdT+zHj71vNXyKoNPcB3W3kZnQSbw3s4BzdQssUauaT9lsTf2DsaHtf6QqVCoR/BQmVbkwGgyjEnLIXTOYuhMVIeIsFRUTBLDdvUBzTETpXev7gg8KtcOtDYzS5favUdzRKgCB9p7UlmQJ0ldh+WeBGj5QBToVjVNaa7B2AJIMynnTTUAqWaBsE99RmnbAfg7cO9JvYnMIVKWBysd5cMLvQONWgzP0PjAnRm1uwa2Tjis0cuhjUWGBxDml75bI1TGmJAb0tdSX+KLxTO0KYURAutQ1+TQ1yE5Y4PocrOnLTDXgvU0ujrGotUmsRDznm6vI6EKKSJ4Hx/w+PRqk5IWH+rZWSuyfrEY/fXcvtpE145ArKheIwBMqEbmsrQ3NgUZCVwjrJjtEHVKbEfj+DDqzqaRl55h8O4fXCMs1ExbWbWbwy7FLwtDllp6da41NtS1QbZUBwk9myFEEpc9nTMW2fyA+eWGAm24RjhQa+nerh/cZR2oiizQRWWVRaBo941LBe1loM6/k/nGRsMxm7ZVR0J91HHpUgVdHK5cWCHEbUXZIdRpS0MrLdO5J1VhemWzDkNcBnxm07tbJ/SnYI8pA6fJNFWJR86h4KnbwubOOsi+Nl1hOjOjfyq6x8cWti/opPtSs+4H51NBeqJZIES+Q7DvTh1CFZ23nBHqTh49+jiQUaIFwuJInTAjNM14xU3nFqsFi5B+Z8XYXs1XGM9y6zKnPuLgY1VDFhARSoSUptOVcAG0mdNkmu5D8USn3zju3SJzGk265z5OOrPi96J+jwFZuX9HbgOuzR8iHY9AqKsP3oyNOHe0GNlDIr2AdmfdfQPFfUzrsNSkoUf7YprA1nz/k8TgTF1obGOB4TSZKN/zQLJ4Et/J5Z5kS4uSFgNhw3GaTNMvsYPfweD6RAtG5hFhb0Tbr5ZAXIHq3lKc11ohx8HiHrGWdsSxuaBY96xCXYFCWJjT+xjDqILg8HeDYBmHqJKIos0v5lQ7htNsHKzeSzK5/U06YkH+6NpWHpfmsRQnq4w9q7CcZqvprXnjDQdrO3hbGXVN1Tu6sSDyewnInntFaewj2LqRt5xqTTL56G1f1eFnFCTiEelBsV12i0KgXp3xlLzv1BSykPUgqOMqBdPF1sDg+wjrW7NDV/A4wX/QESHTSXyII8a6fnWB3fTH9xHWdZXzA0cg2cjDQYuq/Nc6EOdoX/8vxhIPQh/htbr7Y/X/ct62rJ8xyWMSV1lLweTRx+dJfYT1ayo1DQ+ClXO9JSDzmSj1xSkWYdJIl93SUQPdNDyYOHeCNElHtcko5ZfBQ6P2CC9LNSTXm3+Tq69DY/It7e3vyTVPeqaEWrRvIxQdE1Y85JFX6wnIwzKlL3Gx2LuUMdO+jVC08U3dkZduO0h5LHfvHZCCONq3EVipYO1YLzCXAuC4yS8HRH5azjkJ3C7dFWG49zXAo8sXwYwSOY3Sdr/BeFwxdRl24jS5Fjfp4U3yckmuV7b43tMpIYpjfA0p1danAsiP80WrMHBv72Elt8Z9JndOozUPzZLI8hDbjNT2G5axh67WRHnKvixIH6n1NywJCW0/8nrkLzym7Ma1iQlNss5Dx0WYVRB76D6HFYs6bHtOU9KORr6JJ68cOU1Ji49DUl9tx2fLacpa5KPLvEEW1kvQ3uOXFmPg4Xg6KEOLwx4+EabK9Yt5mPYyph3R9cdpypqPLgM1ctUVtqNy5TRVLfK0X7EriSs4F05TTTMGA+ctp30ZkY8jevb4VU3anMeDZL3CfIDkiAhDLnymN+665CqiRjhNVeN84WmujgTpK5UNcppdjcc9912olzETVqc7am2poz+salxO3ILjx/rt31N5/L1pHwTWu8FP7SyM9zeWZhBunEfQpoP8aq0k5hsaJ+A0hzQmRDLC94x6HiWh5F5Xn19OU6NJnozNHcz/jRcrKUhdaY7PaeoNjxBBvFzcvB4Ksp4/p61BhsyzaWnK49doOTmXkndXy6Tf63Q6s1ky6LJAys2ba+i5x0NYMbLZ+8pkozX7tEY4zTfVvHKa76k14A+/l9aEx/9e2l9A+E1WS4Pr8Pfb0mP5w1Npx/P4Z4TNIfz96/DkQzhzmrPHPyP8A+vw99vS3+8Pzwh/unbmNL9A+wP+8Izwp2s5pynMze/T/gdlRcXX33aYFwAAAABJRU5ErkJggg=="
          alt=""
        ></img>
        <p className="Card_nick">
          두근두근
        </p>
      </div>
      <hr className="line"></hr>
      <div className="Card_img">
        <img
          className="img_body"
          src={props.url}
          alt={props.alt}
        ></img>
        <img
          className="img_heart"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Coraz%C3%B3n.svg/220px-Coraz%C3%B3n.svg.png"
          alt="heart_icon"
        ></img>
      </div>
      <hr className="line"></hr>
      <div className="Card_container">
        <p>{props.title}</p>
      </div>
    </div>
  );
}

export default Card;
