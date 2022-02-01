import React from "react";

export default function ViewSwiwtcher({ handleViewChange, selectedRadio }) {
  return (
    <form>
      <p className="formItem">
        <label htmlFor="allDesc">
          <input
            type="radio"
            name="viewMode"
            id="allDesc"
            value="allDesc"
            onChange={(e) => handleViewChange(e)}
            checked={selectedRadio === "allDesc"}
          />
          Все посты в хронологическом порядке, старые сверху
        </label>
      </p>
      <p className="formItem">
        <label htmlFor="allRandom">
          <input
            type="radio"
            name="viewMode"
            id="allRandom"
            value="allRandom"
            onChange={(e) => handleViewChange(e)}
            checked={selectedRadio === "allRandom"}
          />
          Все посты в случайном порядке
        </label>
      </p>
      <p className="formItem">
        <label htmlFor="lastMinute">
          <input
            type="radio"
            name="viewMode"
            id="lastMinute"
            value="lastMinute"
            onChange={(e) => handleViewChange(e)}
            checked={selectedRadio === "lastMinute"}
          />
          Посты за последнюю минуту, новые cверху
        </label>
      </p>
    </form>
  );
}
