<script setup lang="ts">
const route = useRoute();
const rssUrl = route.params.rssUrl as string;
const items = ref<{ link: string; title: string }[]>([]);

async function onSubmit() {
  const formData = new FormData();
  formData.set("rssUrl", rssUrl);
  const response = await fetch("/api/fetchFeed", {
    method: "POST",
    body: formData,
  });
  const str = await response.text();
  const rss = new window.DOMParser().parseFromString(str, "text/xml");
  console.log(rss.getElementsByTagName("item")[0]);
  const itemsJson = Array.from(rss.getElementsByTagName("item")).map((item) => {
    let titleX = item.getElementsByTagName("title")[0];
    let title = titleX.innerHTML;
    let linkX = item.getElementsByTagName("link")[0];
    let link = linkX.innerHTML;

    return {
      title,
      link,
    };
  });
  console.log(itemsJson);
  items.value = itemsJson;
}
onSubmit();
</script>

<template>
  <header>
    <h1>Rss reader</h1>
  </header>
  <main>
    <div>
      <a v-for="item in items" :href="item.link">
        <h1>{{ item.title }}</h1>
      </a>
    </div>
  </main>
  <footer></footer>
</template>
