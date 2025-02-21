import { Component, OnInit } from '@angular/core';
import { ShipmentsService } from '../../services/shipments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeltypesService } from '../../services/modeltypes.service';
import { WarehousesService } from '../../services/warehouses.service';
import { take } from 'rxjs';
import { ColumnsInterface } from 'src/app/core/shared/models/Interfaces';

@Component({
  selector: 'app-shipment-form',
  templateUrl: './shipment-form.component.html',
  styleUrls: ['./shipment-form.component.css'],
})
export class ShipmentFormComponent implements OnInit {
  form: FormGroup;
  modelsForm: FormGroup;
  details: any;
  id;
  formType = 'add';
  modelCategories = [];
  modelTypes = [];
  errandChanelsList = [];
  warehousesList = [];
  deviceConditionList = [];
  familiesList = [];
  modeltypeList = [];
  modeltypesList = [];
  itemsFormControlsList = [
    {
      name: 'family',
      header: 'Inventory Family',
      data: this.familiesList,
    },
    {
      name: 'category',
      header: 'Model Category',
      data: this.modelCategories,
    },
    {
      name: 'modeltype',
      header: 'Model Type',
      data: this.modeltypeList,
    },
  ];
  constructor(
    private fb: FormBuilder,
    private service: ShipmentsService,
    private router: Router,
    private route: ActivatedRoute,
    private modeltypesService: ModeltypesService,
    private warehousesService: WarehousesService
  ) {
    this.formType = this.route.snapshot.data.type;
    this.modeltypesList.push({
      id: 1,
      family: 'Family 1',
      category: 'Category 1',
      modeltype: 'Model Type 1',
      qty: 1,
    });
  }

  public columns: ColumnsInterface[] = [
    {
      field: 'id',
      header: 'NO.',
      width: '50px',
    },

    {
      field: 'family',
      header: 'Inventory Family',
      width: '200px',
    },
    {
      field: 'category',
      header: 'Category',
      width: '200px',
    },
    {
      field: 'modeltype',
      header: 'Device/Item',
      width: '200px',
    },
    {
      field: 'qty',
      header: 'QTY',
      width: '200px',
    },
  ];

  ngOnInit() {
    if (this.formType == 'edit') {
      this.id = this.route.snapshot.params.id || null;
      if (this.id) {
        this.getItemDetails();
      }
    }
    this.form = this.fb.group({
      supplier: ['', [Validators.required]],
      shipmentId: [null, [Validators.required]],
      shipmentDate: [null, [Validators.required]],
      warehouseId: [null, [Validators.required]],

      id: [null],
    });

    this.modelsForm = this.fb.group({
      warehouseId: [null, [Validators.required]],
      family: [null, [Validators.required]],
      category: [null, [Validators.required]],
      modeltype: [null, [Validators.required]],
      qty: [null, [Validators.required]],
      id: [null],
    });
    this.getLookupsDropdowns();
  }
  getLookupsDropdowns() {
    this.getWarehouseDropDown();
    this.getFamilyDropDown();
  }

  getCategoryDropDownByFamilyId(id) {
    this.service
      .getCategoryDropDownByFamilyId(id)
      .pipe(take(1))
      .subscribe((resp) => {
        if (resp.success) {
          this.modelCategories = resp.data;
          this.itemsFormControlsList[1].data = [...this.modelCategories];
          this.itemsFormControlsList[2].data = [];
        }
      });
  }

  getFamilyDropDown() {
    this.service
      .getFamilyDropDown()
      .pipe(take(1))
      .subscribe((resp) => {
        if (resp.success) {
          this.familiesList = resp.data;
          this.itemsFormControlsList[0].data = [...this.familiesList];
          this.itemsFormControlsList[1].data = [];
          this.itemsFormControlsList[2].data = [];
        }
      });
  }
  getModelTypeDropDownByCategoryId(id: number) {
    this.service
      .getModelTypeDropDownByCategoryId(id)
      .pipe(take(1))
      .subscribe((resp) => {
        if (resp.success) {
          this.modeltypesList = resp.data;
          this.itemsFormControlsList[2].data = [...this.modeltypesList];
        }
      });
  }

  getWarehouseDropDown() {
    this.warehousesService
      .getAgentWarehouseDropDown()
      .pipe(take(1))
      .subscribe((resp) => {
        if (resp.success) {
          this.warehousesList = resp.data;
        }
      });
  }

  getItemDetails() {
    this.service
      .getDetailsById(this.id)
      .pipe(take(1))
      .subscribe((resp) => {
        if (resp.success) {
          this.details = resp.data;
          if (this.details) {
            this.form.patchValue(this.details);
            // this.form.get('modelCategoryId').setValue(this.details.categoryId);
          }
        }
      });
  }

  onSelectOption(selectedOption: any, controlName: DDLControlType) {
    if (selectedOption) {
      switch (controlName) {
        case DDLControlType.Family:
          this.getCategoryDropDownByFamilyId(selectedOption);
          break;
        case DDLControlType.Category:
          this.getModelTypeDropDownByCategoryId(selectedOption);
          break;
      }
    }
  }
  get f() {
    return this.form.controls;
  }
  get mf() {
    return this.modelsForm.controls;
  }

  submit() {
    let obj = this.form.value;
    if (!this.id) {
      delete obj.id;
    }
    if (this.formType == 'add') {
      this.service
        .add(this.form.value)
        .pipe(take(1))
        .subscribe({
          next: (resp) => {
            if (resp.success) {
              this.backToList();
            }
          },
        });
    } else {
      this.service
        .update(this.form.value)
        .pipe(take(1))
        .subscribe({
          next: (resp) => {
            if (resp.success) {
              this.backToList();
            }
          },
        });
    }
  }
  backToList() {
    this.router.navigate(['main/inventory/devices/list']);
  }

  editmodel(model) {}
  rowClickedAction(event) {}
}

export enum DDLControlType {
  Family = 'family',
  Category = 'category',
  ModelType = 'modeltype',
}
