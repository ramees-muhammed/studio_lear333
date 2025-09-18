import PrimaryBtn from "../../../components/RegisterPage/PrimaryBtn";
import "./Subscriptions.scss";

const Subscriptions = () => {
  return (
    <div className="subscriptions_page">
      <div className="subscriptions_page_title">
        <h1>
          Choose the right <br />
          <span>Lear plan</span> for you.
        </h1>
      </div>

      <div className="subscriptions">
        {/* 1. */}
        <div className="subscription">
          <div className="subscription_contents">
            <div>
              <p className="subscription_type">
                Classic <span>(monthly)</span>
              </p>
              <p className="subscription_price">
                <span>$</span>2,500
              </p>

              <div className="subscription_points">
                <div className="flex">
                  <img src="/RegisterPage/images/mark-icon.svg" alt="..." />
                  <p>10,0000 photographs</p>
                </div>
                <div className="flex">
                  <img src="/RegisterPage/images/mark-icon.svg" alt="..." />
                  <p>1 user</p>
                </div>
                <div className="flex">
                  <img src="/RegisterPage/images/mark-icon.svg" alt="..." />
                  <p>Chat support</p>
                </div>
              </div>
            </div>
            <div className="love_icon_circle">
              <img src="/RegisterPage/images/love-icon.svg" alt="..." />
            </div>
          </div>

          <PrimaryBtn title="Purchase" />
        </div>

        {/* 2. */}
        <div className="subscription">
          <div className="subscription_contents">
            <div>
              <p className="subscription_type">
                Classic <span>(monthly)</span>
              </p>
              <p className="subscription_price">
                <span>$</span>2,500
              </p>

              <div className="subscription_points">
                <div>
                  <img src="/RegisterPage/images/mark-icon.svg" alt="..." />
                  <p>Unlimited photographs</p>
                </div>
                <div>
                  <img src="/RegisterPage/images/mark-icon.svg" alt="..." />
                  <p>3 user</p>
                </div>
                <div>
                  <img src="/RegisterPage/images/mark-icon.svg" alt="..." />
                  <p>24/7 online support</p>
                </div>
              </div>
            </div>
            <div className="love_icon_circle">
              <img src="/RegisterPage/images/love-icon.svg" alt="..." />
            </div>
          </div>

          <PrimaryBtn title="Purchase" />
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
