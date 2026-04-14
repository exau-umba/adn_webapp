export type ClientStatus = "Actif" | "Suspendu";

export interface Client {
  id: string;
  name: string;
  contact: string;
  city: string;
  activeMissions: number;
  status: ClientStatus;
  phone: string;
  address: string;
  sector: string;
}

export const clientsData: Client[] = [
  {
    id: "cl-001",
    name: "Residence Mbuyi",
    contact: "Mme Mbuyi",
    city: "Kinshasa",
    activeMissions: 3,
    status: "Actif",
    phone: "+243 824 111 222",
    address: "Avenue de la Justice, Gombe",
    sector: "Residence privee",
  },
  {
    id: "cl-002",
    name: "Hotel Lumiere",
    contact: "M. Kabeya",
    city: "Lubumbashi",
    activeMissions: 2,
    status: "Actif",
    phone: "+243 997 333 444",
    address: "Boulevard M'siri, Lubumbashi",
    sector: "Hotellerie",
  },
  {
    id: "cl-003",
    name: "Villa Kivu",
    contact: "Mme Nsimba",
    city: "Goma",
    activeMissions: 0,
    status: "Suspendu",
    phone: "+243 899 555 666",
    address: "Quartier Himbi, Goma",
    sector: "Residence secondaire",
  },
];
