import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addOrUpdateToCart,
  getCart as fetchCart,
  removeFromCart,
} from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function useCarts() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();
  const cartQuery = useQuery({
    queryKey: ["carts", uid || ""],
    queryFn: () => fetchCart(uid),
    staleTime: 1000 * 60,
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation(
    ({ product }) => addOrUpdateToCart(uid, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["carts", uid]);
      },
    }
  );

  const removeItem = useMutation(
    ({ productId }) => removeFromCart(uid, productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["carts", uid]);
      },
    }
  );

  return {
    cartQuery,
    addOrUpdateItem,
    removeItem,
  };
}
