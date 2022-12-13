// Response Handler For Get Response In Any File...
global.sendRes = function(res, msg, status, data) {
    const meta = { msg, status };
    if (!data) {
      return res.json({ meta });
    }
    return res.json({ meta, data });
  };