import { create } from 'zustand';

export type DeliveryItem = {
  id: string;
  name: string;
  person: string;
  price: number;
};

export type ActiveOrder = {
  platform: string;
  store: string;
  deliveryFee: number;
  items: DeliveryItem[];
};

export type Group = {
  id: string;
  name: string;
  location: string;
  members: string[];
  activeOrder: ActiveOrder | null;
};

export type HistoryOrder = ActiveOrder & {
  id: string;
  groupId: string;
  groupName: string;
  location: string;
  completedAt: string;
};

type CreateGroupInput = {
  name: string;
  location: string;
  creator: string;
};

type AddItemInput = {
  name: string;
  person: string;
  price: number;
};

type StartOrderInput = {
  platform: string;
  store: string;
  deliveryFee: number;
};

type HyperDeliveryStore = {
  groups: Group[];
  history: HistoryOrder[];
  createGroup: (input: CreateGroupInput) => string;
  joinGroup: (groupId: string, member: string) => void;
  startOrder: (groupId: string, order: StartOrderInput) => void;
  updateDeliveryFee: (groupId: string, deliveryFee: number) => void;
  addItem: (groupId: string, item: AddItemInput) => void;
  completeOrder: (groupId: string) => void;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const formatId = (prefix: string, value: string) => `${prefix}-${slugify(value)}-${Math.floor(Date.now() / 1000).toString(36)}`;

export const formatRupiah = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

export const uniqueParticipants = (items: DeliveryItem[]) =>
  Array.from(new Set(items.map((item) => item.person.trim()).filter(Boolean)));

export const calculateSplit = (order: ActiveOrder) => {
  const participants = uniqueParticipants(order.items);
  const participantCount = Math.max(participants.length, 1);
  const deliveryShare = order.deliveryFee / participantCount;

  const breakdown = participants.map((person) => {
    const itemTotal = order.items.filter((item) => item.person.trim() === person).reduce((sum, item) => sum + item.price, 0);
    return {
      person,
      itemTotal,
      deliveryShare,
      total: itemTotal + deliveryShare,
      items: order.items.filter((item) => item.person.trim() === person),
    };
  });

  const totalItems = order.items.reduce((sum, item) => sum + item.price, 0);

  return {
    participants,
    participantCount,
    deliveryShare,
    breakdown,
    totalItems,
    grandTotal: totalItems + order.deliveryFee,
  };
};

export const buildWhatsAppSummary = (group: Group, order: ActiveOrder) => {
  const split = calculateSplit(order);
  const lines = [
    `HYPER_DELIVERY — ${group.name}`,
    `Lokasi: ${group.location}`,
    `Platform: ${order.platform}`,
    `Toko: ${order.store}`,
    `Biaya antar: ${formatRupiah(order.deliveryFee)}`,
    '',
    'Item pesanan:',
    ...order.items.map((item) => `- ${item.name} · ${item.person} · ${formatRupiah(item.price)}`),
    '',
    'Pembagian tagihan:',
    ...split.breakdown.map((row) => `- ${row.person}: ${formatRupiah(row.itemTotal)} + ongkir ${formatRupiah(row.deliveryShare)} = ${formatRupiah(row.total)}`),
    '',
    `Total pesanan: ${formatRupiah(split.grandTotal)}`,
  ];

  return lines.join('\n');
};

const seedGroups: Group[] = [
  {
    id: 'kos-melati-lt-2',
    name: 'Kos Melati Lt. 2',
    location: 'Jl. Melati No. 22, Jakarta Selatan',
    members: ['Alya', 'Rafi', 'Dina'],
    activeOrder: {
      platform: 'GoFood',
      store: 'Ayam Bakar Mang Ujang',
      deliveryFee: 18000,
      items: [
        { id: 'item-1', name: 'Ayam Bakar Komplit', person: 'Alya', price: 32000 },
        { id: 'item-2', name: 'Es Teh Manis', person: 'Alya', price: 7000 },
        { id: 'item-3', name: 'Nasi Goreng Kampung', person: 'Rafi', price: 28000 },
      ],
    },
  },
  {
    id: 'kompleks-alamanda-blok-c',
    name: 'Kompleks Alamanda Blok C',
    location: 'Kompleks Alamanda, Bekasi Barat',
    members: ['Nadia', 'Bayu', 'Salsa', 'Damar'],
    activeOrder: null,
  },
  {
    id: 'griya-asri-tower-b',
    name: 'Griya Asri Tower B',
    location: 'Griya Asri, Depok Timur',
    members: ['Iqbal', 'Maya', 'Ferry'],
    activeOrder: {
      platform: 'GrabFood',
      store: 'Bakmi Langganan Pakde',
      deliveryFee: 22000,
      items: [
        { id: 'item-4', name: 'Bakmi Pangsit', person: 'Iqbal', price: 29000 },
        { id: 'item-5', name: 'Pangsit Goreng', person: 'Maya', price: 18000 },
        { id: 'item-6', name: 'Es Jeruk', person: 'Maya', price: 9000 },
        { id: 'item-7', name: 'Bakmi Ayam Cincang', person: 'Ferry', price: 31000 },
      ],
    },
  },
];

const seedHistory: HistoryOrder[] = [
  {
    id: 'hist-001',
    groupId: 'kos-melati-lt-2',
    groupName: 'Kos Melati Lt. 2',
    location: 'Jl. Melati No. 22, Jakarta Selatan',
    platform: 'GoFood',
    store: 'Sate Sore',
    deliveryFee: 16000,
    items: [
      { id: 'item-8', name: 'Sate Ayam', person: 'Alya', price: 25000 },
      { id: 'item-9', name: 'Sop Buntut', person: 'Dina', price: 38000 },
    ],
    completedAt: '2026-05-01T19:25:00.000Z',
  },
  {
    id: 'hist-002',
    groupId: 'griya-asri-tower-b',
    groupName: 'Griya Asri Tower B',
    location: 'Griya Asri, Depok Timur',
    platform: 'GrabFood',
    store: 'Kopi Senja',
    deliveryFee: 14000,
    items: [
      { id: 'item-10', name: 'Kopi Susu', person: 'Maya', price: 22000 },
      { id: 'item-11', name: 'Roti Bakar', person: 'Ferry', price: 19000 },
    ],
    completedAt: '2026-05-01T21:10:00.000Z',
  },
];

export const useHyperDeliveryStore = create<HyperDeliveryStore>((set) => ({
  groups: seedGroups,
  history: seedHistory,
  createGroup: (input) => {
    const id = formatId('group', input.name);
    set((state) => ({
      groups: [
        {
          id,
          name: input.name,
          location: input.location,
          members: Array.from(new Set([input.creator.trim()].filter(Boolean))),
          activeOrder: null,
        },
        ...state.groups,
      ],
    }));
    return id;
  },
  joinGroup: (groupId, member) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id !== groupId
          ? group
          : {
              ...group,
              members: Array.from(new Set([...group.members, member.trim()].filter(Boolean))),
            },
      ),
    })),
  startOrder: (groupId, order) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id !== groupId
          ? group
          : {
              ...group,
              activeOrder: {
                platform: order.platform,
                store: order.store,
                deliveryFee: order.deliveryFee,
                items: [],
              },
            },
      ),
    })),
  updateDeliveryFee: (groupId, deliveryFee) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id !== groupId || !group.activeOrder
          ? group
          : {
              ...group,
              activeOrder: {
                ...group.activeOrder,
                deliveryFee,
              },
            },
      ),
    })),
  addItem: (groupId, item) =>
    set((state) => ({
      groups: state.groups.map((group) => {
        if (group.id !== groupId || !group.activeOrder) return group;
        return {
          ...group,
          members: Array.from(new Set([...group.members, item.person.trim()].filter(Boolean))),
          activeOrder: {
            ...group.activeOrder,
            items: [
              ...group.activeOrder.items,
              {
                id: formatId('item', item.name),
                name: item.name,
                person: item.person.trim(),
                price: item.price,
              },
            ],
          },
        };
      }),
    })),
  completeOrder: (groupId) =>
    set((state) => {
      const target = state.groups.find((group) => group.id === groupId);
      if (!target?.activeOrder) return state;

      const completedOrder: HistoryOrder = {
        id: formatId('hist', target.name),
        groupId: target.id,
        groupName: target.name,
        location: target.location,
        ...target.activeOrder,
        completedAt: new Date().toISOString(),
      };

      return {
        history: [completedOrder, ...state.history],
        groups: state.groups.map((group) =>
          group.id !== groupId
            ? group
            : {
                ...group,
                activeOrder: null,
              },
        ),
      };
    }),
}));
