import { SapoAccountLocationService } from '../../services/SapoAccountLocationService';
import withSession from '../../lib/session';

async function handler(req, res) {
  const { countryId, type, cityId, districtId } = req.query;
  if (type === 'ward') {
    const sapoCityDistricts = await SapoAccountLocationService.GetSapoWards(countryId, cityId, districtId);
    res.send(sapoCityDistricts);
  } else {
    const sapoCityDistricts = await SapoAccountLocationService.GetSapoCityDistricts(countryId);
    res.send(sapoCityDistricts);
  }
}

export default withSession(handler);
