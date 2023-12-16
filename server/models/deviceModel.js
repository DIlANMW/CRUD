// devices.js
import { getConnection } from "./db.js";

const getAllDevices = async (callback) => {
  const connection = await getConnection();

  try {
    const [rows] = await connection.query("SELECT * FROM Devices");
    callback(null, rows);
  } catch (err) {
    callback(err, null);
  } finally {
    connection.release();
  }
};

const addDevice = async (deviceData, callback) => {
  const { DeviceName, Rating, Description } = deviceData;

  const connection = await getConnection();

  try {
    await connection.query(
      `INSERT INTO Devices (DeviceName, Rating, Description)
        VALUES (?, ?, ?)`,
      [DeviceName, Rating, Description]
    );
    callback(null);
  } catch (err) {
    callback(err);
  } finally {
    connection.release();
  }
};

const deleteDevice = async (deviceId, callback) => {
  const connection = await getConnection();

  try {
    await connection.query("DELETE FROM Devices WHERE DeviceID = ?", [
      deviceId,
    ]);
    callback(null);
  } catch (err) {
    callback(err);
  } finally {
    connection.release();
  }
};

const updateDevice = async (deviceId, deviceData, callback) => {
  const { DeviceName, Rating, Description } = deviceData;

  const connection = await getConnection();

  try {
    await connection.query(
      `UPDATE Devices
        SET DeviceName = ?,
            Rating = ?,
            Description = ?
       WHERE DeviceID = ?`,
      [DeviceName, Rating, Description, deviceId]
    );
    callback(null);
  } catch (err) {
    callback(err);
  } finally {
    connection.release();
  }
};

export { getAllDevices, addDevice, deleteDevice, updateDevice };
