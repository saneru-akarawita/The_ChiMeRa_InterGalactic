<script setup lang="ts">
import { ref } from "vue";
import AppButton from "../components/common/AppButton.vue";
import AppInput from "~/components/common/AppInput.vue";
defineOptions({
  name: "ShipSelectPage",
});
const dummyData = {
  destination: "Mars",
  ships: [
    {
      name: "SpaceX",
      economy_price: 1000,
      business_price: 2000,
      first_price: 3000,
      economy_seat_total: 100,
      business_seat_total: 50,
      first_seat_total: 25,
      economy_seat_occupied: 50,
      business_seat_occupied: 25,
      first_seat_occupied: 10,
    },
    {
      name: "SpaceY",
      economy_price: 1000,
      business_price: 2000,
      first_price: 3000,
      economy_seat_total: 100,
      business_seat_total: 50,
      first_seat_total: 25,
      economy_seat_occupied: 50,
      business_seat_occupied: 25,
      first_seat_occupied: 10,
    },
    {
      name: "SpaceZ",
      economy_price: 1000,
      business_price: 2000,
      first_price: 3000,
      economy_seat_total: 100,
      business_seat_total: 50,
      first_seat_total: 25,
      economy_seat_occupied: 50,
      business_seat_occupied: 25,
      first_seat_occupied: 10,
    },
  ],
};

let selectedSeatType = ref("");

const selectSeatType = (type: "FIRST" | "BUSINESS" | "ECONOMY") => {
  selectedSeatType.value = type;
};

let selectedShip = ref(dummyData.ships[0]);
const selectShip = (index: number) => {
  console.log(selectedShip);
  selectedShip.value = dummyData.ships[index];
  selectedSeatType.value = "";
  console.log(selectedShip);
};
</script>

<template>
  <main class="default-container">
    <h1 class="heading-1">Select a ship</h1>
    <h2>Destination: {{ dummyData.destination }}</h2>
    <app-input
      label="Select your starting location"
      model-value=""
      label-for="select"
      type="text"
      class="start-select"
    />
    <div class="ships">
      <div v-for="(ship, index) in dummyData.ships" class="ship" :key="index">
        <div class="image">
          <img src="https://via.placeholder.com/150" alt="ship image" />
        </div>
        <h4>
          {{ ship.name }}
        </h4>
        <div class="select-button-container">
          <app-button @click="selectShip(index)"> Select </app-button>
        </div>
      </div>
    </div>

    <hr />

    <div v-if="selectedShip" class="seat-select">
      <h3>Selected Ship: {{ selectedShip.name }}</h3>
      <h4>Available Seats</h4>
      <div class="seat-type-select">
        <div
          v-if="
            selectedShip.first_seat_occupied < selectedShip.first_seat_total
          "
          class="first-class"
        >
          <app-button mode="outline" @click="selectSeatType('FIRST')">
            Select <b>First Class</b>:
            <b>{{ selectedShip.first_seat_occupied }}</b> seats out of
            <b>{{ selectedShip.first_seat_total }}</b> are available.
          </app-button>
        </div>
        <div
          v-if="
            selectedShip.business_seat_occupied <
            selectedShip.business_seat_total
          "
          class="business"
        >
          <app-button mode="outline" @click="selectSeatType('BUSINESS')">
            Select <b>Business Class</b>:
            <b>{{ selectedShip.business_seat_occupied }}</b> seats out of
            <b>{{ selectedShip.business_seat_total }}</b> are available.
          </app-button>
        </div>
        <div
          v-if="
            selectedShip.economy_seat_occupied < selectedShip.economy_seat_total
          "
          class="economy"
        >
          <app-button mode="outline" @click="selectSeatType('ECONOMY')">
            Select <b>Economy Class</b>:
            <b>{{ selectedShip.economy_seat_occupied }}</b> seats out of
            <b>{{ selectedShip.economy_seat_total }}</b> are available.
          </app-button>
        </div>
      </div>
    </div>
    <div v-if="selectedSeatType !== ''">
      <div class="payment">
        Your trip will cost you
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.51068 8.87255L7.29673 8.83764C6.63346 8.72941 6.12744 8.15724 6.12744 7.46723C6.12744 6.70022 6.75293 6.07843 7.5245 6.07843C8.25736 6.07843 8.85843 6.63939 8.9169 7.35294H8.46305C8.40632 6.88776 8.00775 6.52735 7.5245 6.52735C7.00233 6.52735 6.57903 6.94815 6.57903 7.46723C6.57903 7.92993 6.91556 8.31487 7.3586 8.39272L7.51068 8.41944L7.51068 8.87255Z"
            fill="#7059FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.0708 10.7353L9.80588 10.9145C9.14807 11.3595 8.35468 11.6195 7.50088 11.6195C5.22627 11.6195 3.38232 9.77552 3.38232 7.5009C3.38232 5.22628 5.22627 3.38234 7.50088 3.38234C9.70787 3.38234 11.5094 5.11821 11.6146 7.29918L11.6172 7.35294H11.1445L11.1422 7.30898C11.0424 5.38447 9.45028 3.85464 7.50088 3.85464C5.48711 3.85464 3.85462 5.48713 3.85462 7.5009C3.85462 9.51467 5.48711 11.1472 7.50088 11.1472C8.10061 11.1472 8.66625 11.0024 9.16506 10.7461L9.18616 10.7353H10.0708Z"
            fill="#7059FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.1743 9.7764L12.2087 9.70589L11.8554 9.70589L11.7038 9.70589L8.03191 9.70589V10.1961H11.4068C10.5505 11.4348 9.12035 12.2462 7.5007 12.2462C4.87996 12.2462 2.75543 10.1217 2.75543 7.50092C2.75543 4.88018 4.87996 2.75564 7.5007 2.75564C10.0561 2.75564 12.1398 4.77561 12.242 7.3059L12.2439 7.35294H12.6959L12.694 7.30208C12.5894 4.52398 10.3043 2.30392 7.5007 2.30392C4.63048 2.30392 2.30371 4.63069 2.30371 7.50092C2.30371 10.3711 4.63048 12.6979 7.5007 12.6979C9.55491 12.6979 11.3307 11.5061 12.1743 9.7764Z"
            fill="#7059FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.99038 8.38237V8.87257L13.3223 8.87257C12.702 11.5139 10.3307 13.4804 7.50018 13.4804C4.19731 13.4804 1.51979 10.8029 1.51979 7.50001C1.51979 4.19713 4.1973 1.51962 7.50018 1.51962C10.7539 1.51962 13.4007 4.11803 13.4788 7.35296H13.9201C13.8419 3.87435 10.9976 1.07845 7.50018 1.07845C3.95364 1.07845 1.07861 3.95348 1.07861 7.50001C1.07861 11.0465 3.95364 13.9216 7.50018 13.9216C10.7474 13.9216 13.4316 11.5114 13.8616 8.38238L7.99038 8.38237Z"
            fill="#7059FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.9986 7.35293C14.9202 3.27868 11.593 -1.78911e-07 7.5 0C3.35786 1.81059e-07 0 3.35787 0 7.5C0 11.6421 3.35786 15 7.5 15C11.3436 15 14.5119 12.1087 14.9486 8.38235H14.4295C13.9958 11.8234 11.0587 14.4847 7.5 14.4847C3.64244 14.4847 0.515267 11.3576 0.515267 7.5C0.515267 3.64244 3.64244 0.515267 7.5 0.515267C11.3084 0.515267 14.4049 3.56327 14.4832 7.35293H14.9986Z"
            fill="#7059FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.54861 10.1471L7.40636 10.1422C5.98786 10.0932 4.85303 8.92828 4.85303 7.49835C4.85303 6.03734 6.0378 4.85295 7.49929 4.85295C8.91197 4.85295 10.0661 5.95954 10.1416 7.35296H9.69345C9.6186 6.20674 8.66484 5.30017 7.49929 5.30017C6.28487 5.30017 5.30039 6.28433 5.30039 7.49835C5.30039 8.68457 6.24034 9.65138 7.4162 9.695L7.54861 9.69991V10.1471Z"
            fill="#7059FF"
          />
        </svg>
        <div class="price">
          {{
            selectedSeatType === "FIRST"
              ? selectedShip.first_price
              : selectedSeatType === "BUSINESS"
              ? selectedShip.business_price
              : selectedShip.economy_price
          }}
        </div>
      </div>
      <div class="button-container">
        <app-button> Proceed To Pay </app-button>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.button-container {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 2rem;
  align-items: center;
}
.heading-1 {
  text-align: center;
  margin-bottom: 2rem;
}
h2 {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 2rem;
}
h3 {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 2rem;
  margin-left: 2rem;
}
.ships {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  .ship {
    .select-button-container {
      display: flex;
      justify-content: center;
    }
  }
}
h4 {
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 0.5rem;
}
p {
  text-align: right;
  font-size: 1rem;
  margin-bottom: 1rem;
}
hr {
  margin: 2rem 0;
}
.start-select {
  max-width: 20rem;
  margin: 1rem;
}
.seat-type-select {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  div {
    width: 100%;
    text-align: center;
    button {
      text-align: center;
      width: 60%;
    }
  }
}
.payment {
  width: 100%;
  font-size: larger;
  text-align: center;
  margin-top: 1rem;
  display: inline-flex;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  font-size: 1.5rem;
  .price {
    font-weight: 600;
  }
}
</style>
