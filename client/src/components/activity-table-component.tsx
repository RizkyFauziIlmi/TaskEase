import moment from "moment";
import { GetUserResponse } from "../../types";

interface ActivityTableComponent {
  showRead: boolean;
  data: GetUserResponse;
  isLoading: boolean;
}

export const ActivityTableComponent = ({
  showRead,
  data,
  isLoading,
}: ActivityTableComponent) => {
  if (isLoading) {
    return (
      <div className="skeleton hidden lg:block lg:overflow-auto lg:w-[97%] h-60 rounded-md"></div>
    );
  }

  return (
    <div className="hidden lg:block lg:overflow-auto lg:w-[97%] h-60 bg-base-100 rounded-md">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Activity ID</th>
            <th>description</th>
            <th>table</th>
            <th>method</th>
            <th>time at</th>
          </tr>
        </thead>
        <tbody>
          {data.activities
            ?.sort((a, b) => moment(b.time).diff(moment(a.time)))
            ?.filter((value) =>
              showRead ? value.method !== "" : value.method !== "READ"
            )
            .map((value) => (
              <tr key={value.id}>
                <th>{value.id}</th>
                <td>{value.description}</td>
                <td>{value.table}</td>
                <td>{value.method}</td>
                <td>{moment(new Date(value.time)).calendar()}</td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>description</th>
            <th>table</th>
            <th>method</th>
            <th>time at</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
