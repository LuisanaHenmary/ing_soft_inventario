import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import useStoreGlobal from "../../store/useStoreGlobal";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const InformStock = () => {
  const productsConnect = collection(db, "products");
  const moventsConnect = collection(db, "movements");
  const listProducts = useStoreGlobal((state) => state.listProducts);
  const setProducts = useStoreGlobal((state) => state.setProducts);
  const listMovements = useStoreGlobal((state) => state.listMovements);
  const setMovements = useStoreGlobal((state) => state.setMovements);
  const setLoader = useStoreGlobal((state) => state.setLoader);

  const [data, setData] = useState(null);
  const [dataMovents, setDataMovents] = useState(null);
  const [dataMoventsSell, setDataMoventsSell] = useState(null);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  useEffect(() => {
    const products = async () => {
      const responseCategory = await getDocs(productsConnect);
      const products = responseCategory.docs.map((doc) => ({
        ...doc.data(),
        idDocument: doc.id,
      }));
      console.log("producst", products);
      setProducts(products);
      setLoader(false);
    };

    const movents = async () => {
      const responseCategory = await getDocs(moventsConnect);
      const movents = responseCategory.docs.map((doc) => ({
        ...doc.data(),
        idDocument: doc.id,
      }));
      console.log("movents", movents);
      setMovements(movents);
      setLoader(false);
    };
    listProducts.length == 0 && products();
    listMovements.length == 0 && movents();
  }, []);

  useEffect(() => {
    if (listProducts.length == 0) return;
    const listProducts1 = listProducts.map((element) => {
      return {
        label: element.name,
        data: [element.acount],
        backgroundColor: `rgba(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()}, 0.7)`,
      };
    });

    const data1 = {
      labels: ["Stock"],
      datasets: listProducts1,
    };
    setData(data1);
  }, [listProducts]);

  useEffect(() => {
    if (listProducts.length == 0) return;

    const buyer = listMovements.filter(
      (element) => element.type_mov == "Compra"
    );
    const sell = listMovements.filter((element) => element.type_mov == "Venta");
    const data1 = {
      labels: ["Compra"],
      datasets: [...calucalateMovents(buyer)],
    };
    setDataMovents(data1);
    const data2 = {
      labels: ["Ventas"],
      datasets: [...calucalateMovents(sell)],
    };
    setDataMoventsSell(data2);
  }, [listMovements]);

  function getRandomNumber() {
    return Math.floor(Math.random() * 256);
  }

  function calucalateMovents(listValidate) {
    const quantitySum = {};

    listValidate.forEach((item) => {
      const { product, quantity } = item;
      if (quantitySum[product]) {
        quantitySum[product] += quantity;
      } else {
        quantitySum[product] = quantity;
      }
    });

    console.log(quantitySum);

    const listProductsBuyer = Object.entries(quantitySum).map(
      ([product, quantity]) => {
        console.log("product", product, "   quantity::", quantity);
        return {
          label: listProducts.find((element) => element.idDocument == product)
            .name,
          data: [quantity],
          backgroundColor: `rgba(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()}, 0.7)`,
        };
      }
    );
    console.log(listProductsBuyer);
    return listProductsBuyer;
  }

  return (
    <div className="chart-container">
      <div className="chart-card">
        <h2 className="chart-title">Stock de inventario</h2>
        <div className="chart">
          {!!data && <Bar data={data} options={options} />}
        </div>
      </div>
      <div className="chart-card">
        <h2 className="chart-title">Compras de inventario</h2>
        <div className="chart">
          {!!dataMovents && <Bar data={dataMovents} options={options} />}
        </div>
      </div>
      <div className="chart-card">
        <h2 className="chart-title">Venta de inventario</h2>
        <div className="chart">
          {!!dataMoventsSell && (
            <Bar data={dataMoventsSell} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default InformStock;
