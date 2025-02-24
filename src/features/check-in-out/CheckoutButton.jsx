import { useCheckout } from "../check-in-out/useCheckout";
import Button from "../../ui/Button";

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckout();

  return (
    <Button
      onClick={() => checkOut(bookingId)}
      variation="primary"
      size="small"
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
