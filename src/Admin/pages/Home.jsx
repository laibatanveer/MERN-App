import React from "react";

export default function Home() {
  const bgImg =
    "https://image.slidesdocs.com/responsive-images/background/plant-floral-clean-line-yellow-nature-powerpoint-background_324e1ddf60__960_540.jpg";

  const containerStyle = {
    backgroundImage: `url(${bgImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    padding: "40px 0",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardStyle = {
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    borderRadius: "10px",
    padding: "30px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: "80%",
    maxWidth: "800px",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  };

  const messageStyle = {
    fontSize: "18px",
    color: "#555",
    lineHeight: "1.6",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={titleStyle}>A Special Note to Our Valued Admins:</div>
        <div style={messageStyle}>
          Dear Team,
          <br />
          <br />
          As the backbone of our esteemed e-commerce platform, each one of you
          plays a pivotal role in ensuring the seamless experience our customers
          have come to expect. Your dedication, hard work, and commitment don't
          just keep the gears of our system moving - they bring our vision to
          life.
          <br />
          <br />
          While technology and algorithms are the engines, it is your honesty,
          integrity, and genuine effort that fuels this system. Your commitment
          to our mission, your attention to the smallest of details, and your
          unwavering dedication ensures that our customers receive the best.
          <br />
          <br />
          Remember, every decision you make, every issue you resolve, and every
          initiative you undertake makes a difference. As the guardians of our
          platform's credibility and functionality, we trust you to uphold the
          values of our brand, ensuring fairness, transparency, and
          authenticity.
          <br />
          <br />
          We're not just building an e-commerce platform; together, we're
          building trust, establishing genuine connections, and setting
          benchmarks in customer experience.
          <br />
          <br />
          Thank you for being the champions of our mission and vision. Let's
          continue to work with the same passion, dignity, and honesty that have
          always defined us. We value and appreciate each one of you!
          <br />
          <br />
          Warm regards,
          <br />
          beautify.
        </div>
      </div>
    </div>
  );
}
