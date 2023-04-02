import React from "react";
import Head from "next/head";
import { Email, Item, Span, A } from "react-html-email";
import { HOSTING_URL } from "./config";

const Emailer = ({ name }) => {
  const styles = {
    h1: {
      fontSize: "36px",
      fontWeight: "bold",
      color: "#333333",
      margin: "0 0 20px 0",
    },
    p: {
      fontSize: "18px",
      color: "#333333",
      margin: "0 0 10px 0",
    },
    btn: {
      backgroundColor: "#0070f3",
      borderRadius: "4px",
      color: "#ffffff",
      display: "inline-block",
      fontSize: "18px",
      fontWeight: "bold",
      lineHeight: "48px",
      margin: "10px 0",
      padding: "0 16px",
      textDecoration: "none",
      textAlign: "center",
      textTransform: "uppercase",
    },
    signature: {
      fontSize: "18px",
      color: "#333333",
      margin: "20px 0 0 0",
    },
  };

  return (
    <Email style={{ backgroundColor: "#F6F6F6" }} title="Welcome to TradeMe-Manager">
      <Item align="center">
        <h1 style={styles.h1}>Dear {name},</h1>
      </Item>
      <Item align="center">
        <p style={styles.p}>
          Thank you for subscribing to TradeMe-Manager. We are excited to have you
          join our community!
        </p>
      </Item>
      <Item align="center">
        <p style={styles.p}>
          As a subscriber, you will receive the latest updates, news, and
          exclusive content from us.
        </p>
      </Item>
      <Item align="center">
        <a href={HOSTING_URL} style={styles.btn}>
          Click here
        </a>
        <p style={styles.p}>to learn more about our products and services.</p>
      </Item>
      <Item align="center">
        <p style={styles.p}>
          If you have any questions or concerns, please do not hesitate to
          contact us.
        </p>
      </Item>
      <Item align="center">
        <p style={styles.signature}>
          Sincerely,
          <br />
          The TradeMe-Manager Team
        </p>
      </Item>
    </Email>
  );
};

export default Emailer;
