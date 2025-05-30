import { Plus } from "lucide-react";
import React from "react";
import { Badge } from "../ui/badge";
import { Minus } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { CartItemFromServer, CartItemProcessed } from "@/action/cart";
import { Input } from "../ui/input";
import { TicketCartItem } from "@/store/cart-store";

interface TicketCartItemDisplayProps {
  item: CartItemProcessed | TicketCartItem;
  handleDecrease: (item: CartItemProcessed | TicketCartItem) => void;
  handleIncrease: (item: CartItemProcessed | TicketCartItem) => void;
  handleQuantityChange: (
    item: CartItemProcessed | TicketCartItem,
    value: string
  ) => void;
  editable?: boolean;
}

function TicketCartItemDisplay({
  item,
  handleDecrease,
  handleIncrease,
  handleQuantityChange,
  editable = true,
}: TicketCartItemDisplayProps) {
  const quantity = "amount" in item ? item.amount : item.quantity;
  const itemId = "cartItemId" in item ? item.cartItemId : item.ticketTypeName;
  const expiryInterval =
    "duration" in item ? item.duration : item.expiryInterval;

  const getTicketTypeParts = () => {
    const ticketType = item.ticketType;
    if (!ticketType) {
      return { period: "_", userType: "_" };
    }

    let period = "";
    if (ticketType.includes("ONE_WAY")) period = "One Way";
    else if (ticketType.includes("DAILY")) period = "Daily";
    else if (ticketType.includes("THREE_DAY")) period = "Three Day";
    else if (ticketType.includes("MONTHLY")) period = "Monthly";

    let userType = "";
    if (ticketType.includes("STUDENT")) userType = "Student";
    else if (ticketType.includes("ADULT")) userType = "Adult";

    return { period, userType };
  };

  const { period, userType } = getTicketTypeParts();

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4 transition-colors border-secondary/20 hover:bg-secondary/5 hover:border-secondary">
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80">
            {item.startStationName} → {item.endStationName}
          </p>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className="font-medium text-sm border-blue-400 border-1"
            >
              {userType} {period}
            </Badge>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <h4 className="font-bold text-secondary group-hover:text-secondary/80 text-lg">
            {item.lineName}
          </h4>

          <p className="font-bold text-secondary group-hover:text-secondary/80">
            {formatCurrency(item.price)}
          </p>
        </div>
        <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80">
          <span className="font-bold">Expiry: </span>
          {expiryInterval}
        </p>
      </div>

      {editable === true ? (
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-secondary hover:bg-secondary/10 hover:text-secondary/80"
              onClick={() => handleDecrease(item)}
            >
              {quantity === 1 ? (
                <Trash2 className="h-4 w-4" />
              ) : (
                <Minus className="h-4 w-4" />
              )}
            </Button>
            <Input
              type="text"
              disabled={true}
              value={quantity}
              onChange={(e) => handleQuantityChange(item, e.target.value)}
              className="h-8 w-16 text-center"
            />
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-secondary hover:bg-secondary/10 hover:text-secondary/80"
              onClick={() => handleIncrease(item)}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
              onClick={() => handleQuantityChange(item, "0")}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <p className="font-bold text-xl group-hover:text-secondary/80">
            {formatCurrency(item.price * quantity)}
          </p>
        </div>
      ) : (
        <div className="flex justify-between items-end">
          <p className="text-base text-muted-foreground group-hover:text-muted-foreground/80 font-bold">
            Quantity: {quantity}
          </p>
          <p className="font-bold text-xl group-hover:text-secondary/80">
            {formatCurrency(item.price * quantity)}
          </p>
        </div>
      )}
    </div>
  );
}

export default TicketCartItemDisplay;
