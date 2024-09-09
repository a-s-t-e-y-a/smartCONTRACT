const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const JAN_1ST_2030 = "0x47fdb8A987eB865fD95A13E5613b6B84DB7801bA";

module.exports = buildModule("LockModule", (m) => {
  const unlockTime = m.getParameter("_Archie", JAN_1ST_2030);

  const lock = m.contract("TicketReselling", [unlockTime]);

  return { lock };
});
