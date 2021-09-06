import PropTypes from "prop-types";
import s from "./Filter.module.css";

function Filter({ onChange }) {
  return (
    <label className={s.filter}>
      Find contacts by name
      <input
        type="text"
        name="filter"
        onChange={onChange}
        className={s.filterInput}
      />
    </label>
  );
}

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Filter;
