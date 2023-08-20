<script setup lang="ts">
import { ref } from "vue";
import AppButton from "../components/common/AppButton.vue";
defineOptions({
  name: "ShipSelectPage",
});
const dummyData = {
  destination: "Mars",
  ships: [
    {
      name: "SpaceX",
      seats: {
        ECONOMY: 100,
        BUSINESS: 50,
        FIRST: 25,
      }
    },
    {
      name: "SpaceY",
      seats: {
        ECONOMY: 123,
        BUSINESS: 50,
        FIRST: 25,
      }
    },
    {
      name: "SpaceZ",
      seats: {
        ECONOMY: 400,
        BUSINESS: 50,
        FIRST: 25,
      }
    },
  ],
};

let selectedShip = ref(dummyData.ships[0])
;

const selectShip = (index:number) => {
  console.log(selectedShip)
  selectedShip.value = dummyData.ships[index];
  console.log(selectedShip)
}
</script>

<template>
  <main class="default-container">
    <h1 class="heading-1">Select a ship</h1>
    <h2>Destination: {{ dummyData.destination }}</h2>
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
      <h4>
        Available Seats
      </h4>
      <div class="seat-type-select">
        <div v-if="selectedShip.seats.FIRST" class="first-class">
          <input type="radio" name="seatType" id="first" value="FIRST">
          <label for="first">
            First Class: {{ selectedShip.seats.FIRST }}
          </label>
        </div>
        <div v-if="selectedShip.seats.BUSINESS" class="business">
          <input type="radio" name="seatType" id="business" value="BUSINESS">
          <label for="business">
          Business Class: {{ selectedShip.seats.BUSINESS }}
          </label>
        </div>
        <div v-if="selectedShip.seats.ECONOMY" class="economy">
          <input type="radio" name="seatType" id="economy" value="ECONOMY">
          <label for="economy">
          Economy Class: {{ selectedShip.seats.ECONOMY }}
          </label>
        </div>
      </div>
    </div>
    <div class="button-container">
      <app-button> Proceed To Pay </app-button>
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
</style>
