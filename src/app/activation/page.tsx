"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ticket, MapPin, Clock, Info, TicketCheck } from "lucide-react";
import type { InvoiceItem } from "@/types/invoice";
import { toast } from "sonner";
import { activateTicket } from "@/action/invoice";
import { Station } from "@/types/station";
import { getAllStations } from "@/action/station";
import InvoiceItemDisplay from "../invoices/_components/invoice-item-display";

export default function TicketActivationPage() {
  const searchParams = useSearchParams();
  const [ticketCode, setTicketCode] = useState("");
  const [isActivating, setIsActivating] = useState(false);
  const [activatedTicket, setActivatedTicket] = useState<InvoiceItem>();

  const [stations, setStations] = useState<Station[]>([]);
  useEffect(() => {
    const fetchStations = async () => {
      const stations = await getAllStations();
      setStations(stations);
    };
    fetchStations();
  }, []);

  useEffect(() => {
    const invoiceItemId = searchParams.get("invoiceItemId");
    if (invoiceItemId) {
      setTicketCode(invoiceItemId);
    }
  }, [searchParams]);

  const handleActivation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ticketCode.trim()) {
      toast.error("Please enter a ticket code");
      return;
    }

    setIsActivating(true);
    const onActivateAction = activateTicket(ticketCode);
    toast.promise(onActivateAction, {
      loading: "Activating ticket...",
      success: (data) => {
        setActivatedTicket(data);
        setIsActivating(false);
        return data && data.activatedAt
          ? "Ticket is already activated"
          : "Ticket activated successfully";
      },
      error: () => {
        setIsActivating(false);
        return "Failed to activate ticket. Please try again.";
      },
    });
  };

  return (
    <div className="max-w-5xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Ticket Activation Portal</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Enter your ticket code below to activate your transit pass. Once
          activated, your ticket will be valid for the specified duration.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-10">
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="px-6 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Ticket className="size-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Valid Tickets</h3>
              <p className="text-sm text-slate-600">
                Enter your code to activate
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-100">
          <CardContent className="px-6 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <MapPin className="size-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">All Routes</h3>
              <p className="text-sm text-slate-600">
                Access to all transit lines
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-100">
          <CardContent className="px-6 flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <Clock className="size-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium">24-Hour Validity</h3>
              <p className="text-sm text-slate-600">From time of activation</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activation card */}
      <Card className="w-full shadow-lg border-2 mb-12 bg-white">
        <CardContent className="px-8 py-4">
          <form onSubmit={handleActivation} className="space-y-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Ticket className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Enter Your Ticket Code</h2>
              <p className="text-muted-foreground mt-2">
                Enter the code from your ticket to activate it
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4">
              <Input
                type="text"
                value={ticketCode}
                onChange={(e) => setTicketCode(e.target.value)}
                placeholder="Enter ticket code"
                className="text-lg py-6 px-4 font-medium border-2 focus:border-primary"
                autoComplete="off"
              />
              <Button
                type="submit"
                className="py-6 border-2 border-primary px-8 text-lg font-medium"
                disabled={isActivating}
              >
                <TicketCheck className="size-5" />
                {isActivating ? "Activating..." : "Activate"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {activatedTicket && (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 mb-4">
            <Info className="size-5 text-primary" />
            <h2 className="text-xl font-semibold">Activated Ticket</h2>
          </div>
          <InvoiceItemDisplay
            item={activatedTicket}
            stations={stations}
            expanded={false}
          />

          <Card className="mt-6 bg-slate-50 border-slate-200">
            <CardContent className="px-6">
              <h3 className="font-medium mb-2">Important Information</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-primary/20 p-1 rounded-full mt-0.5">
                    <Clock className="size-3 text-primary" />
                  </span>
                  Your ticket is valid for 24 hours from activation time
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/20 p-1 rounded-full mt-0.5">
                    <MapPin className="size-3 text-primary" />
                  </span>
                  You can use this ticket on the specified route only
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/20 p-1 rounded-full mt-0.5">
                    <Ticket className="size-3 text-primary" />
                  </span>
                  Keep your ticket code safe for future reference
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
