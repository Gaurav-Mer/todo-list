import { taskType } from "../helpers/constant";
import styles from "../register.module.css";

export default function DesktopLeft() {
  return (
    <div className={`bg-white vh-100 p-4 `}>
      <button
        className={`${styles.name} border-0 bg-transparent text-secondary fs-5 `}
      >
        <i className="fa-solid fa-plus fa-sm"></i>{" "}
        <span className="m-2 " style={{ fontSize: 18, fontWeight: "600" }}>
          Create new
        </span>
      </button>
      <button className="border-0 bg-transparent text-secondary fs-5 mt-4">
        <i className="fa-solid fa-list-check fa-sm "></i>
        <span className="m-2" style={{ fontSize: 18, fontWeight: "600" }}>
          Assign to
        </span>
      </button>
      <ul className={styles.nested}>
        <li>
          <i className="fa-solid text-secondary  fa-user fa-sm"></i> self
        </li>
        <li>
          <i
            className="fa-solid fa-user-group text-secondary"
            style={{ fontSize: 12 }}
          ></i>
          Team{" "}
        </li>
      </ul>
      <button className="border-0 bg-transparent text-secondary fs-5 mt-2">
        <i className="fa-solid fa-clipboard-list fa-sm"></i>
        <span className="m-2" style={{ fontSize: 18, fontWeight: "600" }}>
          Task Type
        </span>
      </button>
      <ul className={styles.nested}>
        {Object.keys(taskType)?.map((item: string, index) => {
          return <li key={index}>{(taskType as any)[item]}</li>;
        })}
      </ul>
    </div>
  );
}
