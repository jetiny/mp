<template>
  <div class="view-product-list-product">
    <Table :datas="products">
      <TableItem title="团队名称">
        <template slot-scope="{ data }">{{ data.team.title }}</template>
      </TableItem>
      <TableItem title="产品名称">
        <template slot-scope="{ data }">{{ data.product.title }}</template>
      </TableItem>
      <TableItem title="产品描述">
        <template slot-scope="{ data }">{{
          data.product.description
        }}</template>
      </TableItem>
      <TableItem title="个人角色">
        <template slot-scope="{ data }">{{
          data.role | mapProductUserRole
        }}</template>
      </TableItem>
      <TableItem title="创建时间">
        <template slot-scope="{ data }">
          <span>{{ data.product.createdAt | formatDate("yyyy-MM-dd") }}</span>
        </template>
      </TableItem>
      <TableItem title="加入时间">
        <template slot-scope="{ data }">
          <span>{{ data.createdAt | formatDate("yyyy-MM-dd") }}</span>
        </template>
      </TableItem>
      <TableItem title="操作" :width="300">
        <template slot-scope="{ data }">
          <button
            v-tooltip
            content="添加迭代"
            v-if="isEditAble(data)"
            class="h-btn h-btn-s"
            @click="addProductIteration(data)"
          >
            <i class="h-icon-plus"></i>
          </button>
          <button
            v-tooltip
            content="迭代"
            v-if="isEditAble(data)"
            class="h-btn h-btn-s"
            @click="editProductIteration(data)"
          >
            <i class="h-icon-star"></i>
          </button>
          <button
            v-tooltip
            content="成员"
            v-if="isEditAble(data)"
            class="h-btn h-btn-s"
            @click="editProductUser(data)"
          >
            <i class="h-icon-user"></i>
          </button>
          <button
            v-tooltip
            content="编辑"
            v-if="isEditAble(data)"
            class="h-btn h-btn-s"
            @click="editProduct(data)"
          >
            <i class="h-icon-edit"></i>
          </button>
          <button
            v-tooltip
            content="删除"
            v-if="isEditAble(data)"
            class="h-btn h-btn-s"
            @click="deleteProduct(data)"
          >
            <i class="h-icon-trash"></i>
          </button>
        </template>
      </TableItem>
    </Table>
    <Modal v-model="openCreateModal">
      <div @close="openCreateModal = false" @success="refresh"></div>
    </Modal>
    <Modal v-model="openEditModal">
      <ProductEditProduct
        :isEdit="true"
        :item="currentItem"
        @close="openEditModal = false"
        @success="refresh"
      ></ProductEditProduct>
    </Modal>
    <Modal v-model="openUserModal">
      <ProductUser
        :product="currentUserItem"
        @close="openUserModal = false"
      ></ProductUser>
    </Modal>
    <Modal v-model="openIterationModal">
      <ProductIteration
        :product="currentUserItem"
        @close="openIterationModal = false"
      ></ProductIteration>
    </Modal>
    <Modal v-model="openAddIterationModal">
      <ProductAddIteration
        :product="currentItem"
        @close="openAddIterationModal = false"
      ></ProductAddIteration>
    </Modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ProductUserRole } from "../../utils";
import ProductUser from "./ProductUser.vue";
import ProductEditProduct from "./ProductEditProduct.vue";
import ProductIteration from "./ProductIteration.vue";
import ProductAddIteration from "./ProductAddIteration.vue";

@Component({
  name: "ProductListProduct",
  components: {
    ProductUser,
    ProductEditProduct,
    ProductIteration,
    ProductAddIteration
  }
})
export default class ProductListProduct extends Vue {
  private products = [];
  private openCreateModal: boolean = false;
  private openEditModal: boolean = false;
  private openUserModal: boolean = false;
  private openIterationModal: boolean = false;
  private openAddIterationModal: boolean = false;
  private currentItem: any = null;
  private currentUserItem: any = null;
  mounted() {
    this.refresh();
  }
  async refresh() {
    let { products } = await this.$api.Product.GetUserProducts();
    this.products = products;
    this.currentItem = null;
  }
  editProduct(item: any) {
    this.currentItem = JSON.parse(JSON.stringify(item.product));
    this.openEditModal = true;
  }
  editProductUser(item: any) {
    this.openUserModal = true;
    this.currentUserItem = item;
  }
  editProductIteration(item: any) {
    this.openIterationModal = true;
    this.currentUserItem = item;
  }
  addProductIteration(item: any) {
    this.openAddIterationModal = true;
    this.currentItem = item;
  }
  async deleteProduct(item: any) {
    try {
      await this.$Confirm("确定删除？", "删除后不可恢复");
    } catch (err) {
      return;
    }
    await this.$api.Product.DeleteProduct({
      product: item.product.id
    });
    this.products = this.products.filter(it => it !== item);
  }
  isEditAble(data: any) {
    return (
      data.role === ProductUserRole.Master ||
      data.role === ProductUserRole.Owner
    );
  }
}
</script>
