import "./App.css";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

const Table = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
`;
const TH = styled.th`
  border: 1px solid black;
  border-collapse: collapse;
  height: 30px;
`;
const TD = styled.td`
  border: 1px solid black;
  border-collapse: collapse;
  padding: 5px;
  width: ${(props) => (props.$width ? props.$width : "auto")};
  height: 25px;
  /* background-color: #ebebeb; */
  background-color: ${(props) => (props.$isEven ? "#ebebeb" : "#fff")};
`;

const TruncateText = styled.div`
  white-space: nowrap;
  width: 190px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function App() {
  const [data, setData] = useState([]);
  console.log(data);

  // const [page, setPage] = useState(1);
  // const [column, setColumn] = useState();
  // const [order, setOrder] = useState();
  // const [value, setValue] = useState();
  // const [filter, setFilter] = useState();

  const fetchData = () => {
    axios
      .get("/test/data", {
        params: { row: 10 }, //page, column, order, value, filter
      })
      .then((response) => {
        console.log(response);
        setData(response?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("called");
    fetchData();
  }, []);
  // If dependency array is empty useEffect will be called only once .
  //  If dependency array is filled then it changes only on the change of those variables also gets called once when component mounts.

  return (
    <>
      <Table>
        <thead>
          <tr>
            <TH>Id</TH>
            <TH>Product</TH>
            <TH>Name</TH>
            <TH>Department</TH>
            <TH>Price</TH>
            <TH>Adjective</TH>
            <TH>Isbn</TH>
            <TH>Description</TH>
            <TH>Material</TH>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (
              {
                id,
                product,
                name,
                department,
                price,
                adjective,
                isbn,
                description,
                material,
              },
              index
            ) => (
              <tr key={id}>
                <TD $width="2px" $isEven={index % 2 === 0}>
                  {product}
                </TD>
                <TD $width="2px" $isEven={index % 2 === 0}>
                  {id}
                </TD>
                <TD $width="200px" $isEven={index % 2 === 0}>
                  {name}
                </TD>
                <TD $width="90px" $isEven={index % 2 === 0}>
                  {department}
                </TD>
                <TD $width="40px" $isEven={index % 2 === 0}>
                  {price}
                </TD>
                <TD $width="5px" $isEven={index % 2 === 0}>
                  {adjective}
                </TD>
                <TD $width="150px" $isEven={index % 2 === 0}>
                  {isbn}
                </TD>
                <TD
                  $width="200px"
                  $isEven={index % 2 === 0}
                  title={description}
                >
                  <TruncateText>{description}</TruncateText>
                </TD>
                <TD $width="50px" $isEven={index % 2 === 0}>
                  {material}
                </TD>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  );
}

export default App;
