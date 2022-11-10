import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useMemo, useRef, useState } from "react";
import api from "../api";
import type { Trip } from "../types";

type Props = {
  trips: Trip[];
};

type Params = ParsedUrlQuery & {
  origin: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const trips = await api.trips.list(params?.origin!);

  trips.sort((a, b) => a.ratio - b.ratio);

  return {
    props: {
      trips: trips,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

const OriginPage: React.FC<Props> = ({ trips }) => {
  const [sort, setSort] = useState<"price" | "days">("price");
  const [limit, setLimit] = useState<number>(10);
  const matches = useMemo(() => {
    return [...trips].sort((a, b) => a[sort] - b[sort]).slice(0, limit);
  }, [sort, trips, limit]);

  const checkpoint = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLimit((limit) => limit + 10);
      }
    });

    if (checkpoint.current) {
      observer.observe(checkpoint.current!);
    }

    return () => {
      observer.disconnect();
    };
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Destino</td>
            <td
              style={{ color: sort == "days" ? "yellow" : "inherit" }}
              onClick={() => setSort("days")}
            >
              Días
            </td>
            <td
              style={{ color: sort == "price" ? "yellow" : "inherit" }}
              onClick={() => setSort("price")}
            >
              Precio
            </td>
          </tr>
        </thead>
        <tbody>
          {matches.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.origin.destination}</td>
              <td>{trip.days}</td>
              <td>
                {Number(trip.price).toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div ref={checkpoint} />
    </>
  );
};

export default OriginPage;
