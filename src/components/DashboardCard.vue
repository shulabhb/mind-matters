<template>
  <div class="dashboard-card" @click="navigate">
    <img class="card-image" :src="image" alt="Card Image" />
    <div class="card-content">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  methods: {
    navigate() {
      this.$router.push(this.route);
    },
  },
};
</script>

<style scoped>
.dashboard-card {
  width: 400px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  background: linear-gradient(135deg, #4e7d96, #2a515d);
  color: #e0e0e0;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dashboard-card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
}

.card-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
}

.card-content {
  padding-top: 10px;
}

.card-content h3 {
  font-size: 18px;
  margin-bottom: 5px;
  color: rgb(15, 210, 103);
}

.card-content p {
  font-size: 14px;
  color: rgb(4, 4, 4);
}
</style>
