import { FC, useState } from "react";
import { useGetCountries } from "./countries-api";
import { orderBy } from "lodash";
import { uniq } from "lodash";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { format } from "date-fns";

export const CountriesList: FC = () => {
  // This is our hook for fetching data, includes props for error handling and loading.
  const { data, error, isValidating: loading } = useGetCountries();

  // Set state hook for fitlering by gender
  const [genderFilter, setGenderFilter] = useState("all");

  //Se tstate hook for filtering by country
  const [country, setCountry] = useState(" ");

  // Our data
  const results = data?.results;

  // List of coutries, without duplicates orderedBy name
  const countries = orderBy(uniq(results?.map((l) => l.location.country)));

  // Our handler for selecting a country
  const handleCountrySelected = (nextCountry: string) => () => {
    setCountry(nextCountry);
  };

  // Handler for our dropdown select
  const handleFilterChange = (eventKey: string | null) => {
    if (!eventKey) {
      return;
    }

    setGenderFilter(eventKey);
  };

  // Our country filtered data
  const filteredData = results?.filter((u) => u.location.country === country);

  // Our gender filtered data
  const genderedData = filteredData?.filter((g) => g.gender === genderFilter);

  // Our data selector
  const whichData =
    filteredData && genderFilter !== "all" ? genderedData : filteredData;

  // a guard that renders null if we don't have data or if we have an error
  if (!data?.results || error) {
    return null;
  }
  return (
    <div>
      <ListGroup variant="flush">
        {!loading &&
          countries?.map((c) => (
            <ListGroup.Item
              action
              variant="dark"
              key={c}
              onClick={handleCountrySelected(c)}
            >
              {c}
            </ListGroup.Item>
          ))}
      </ListGroup>
      <div>
        <Dropdown onSelect={handleFilterChange}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {genderFilter.toUpperCase()}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1" key={"male"} eventKey="male">
              Male
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2" key={"female"} eventKey="female">
              Female
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2" key={"all"} eventKey="all">
              All
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>City</th>
              <th>State</th>
              <th>Date Registeered</th>
            </tr>
          </thead>
          <tbody>
            {whichData?.map((u) => (
              <tr key={u.id.value}>
                <td>{u.name.title + " " + u.name.first + " " + u.name.last}</td>
                <td>{u.gender}</td>
                <td>{u.location.city}</td>
                <td>{u.location.state}</td>
                <td>{format(new Date(u.registered.date), "MM/dd/yyyy")}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

CountriesList.displayName = "CountriesList";
