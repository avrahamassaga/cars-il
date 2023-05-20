import axios from 'axios';

async function getData(number, setLoading) {
    try {
      setLoading(true);
      const response = await axios.get(`https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&limit=5&q=${number}`);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

export default getData;