import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Ram} from './ram';
import {RamService} from './ram.service';

@Component({
  selector: 'app-ram-list',
  templateUrl: './ram-list.component.html',
  styleUrls: ['./ram-list.component.css']
})
export class RamListComponent implements OnInit {
  rams: Ram[] = [];
  // @ts-ignore
  selectedRam: Ram | null;
  editingRam: Ram | null = null;

  constructor(private router: Router, private ramService: RamService) {
  }

  ngOnInit(): void {
    this.getRams();
  }

  getRams(): void {
    // @ts-ignore
    this.ramService.getRamList()
      .subscribe((rams: Ram[]) => this.rams = rams);
  }

  getRamById(id: number): void {
    // @ts-ignore
    this.ramService.getRam(id)
      .subscribe((ram: Ram) => this.rams.push(ram));
  }

  createRam(modelNumber: string, brandName: string, clockSpeed: string): void {
    modelNumber = modelNumber.trim();
    brandName = brandName.trim();
    clockSpeed = clockSpeed.trim();
    if (!modelNumber || !brandName || !clockSpeed) {
      return;
    }
    const newRam: Ram = {modelNumber, brandName, clockSpeed} as Ram;
    this.ramService.createRam(newRam)
      .subscribe(ram => {
        this.rams.push(ram);
        this.selectedRam = null;
      });
  }

  updateSelectedRam(): void {
    if (this.selectedRam) {
      this.ramService.updateRam(this.selectedRam.id, this.selectedRam)
        .subscribe(ram => {
          const index = this.rams.findIndex(r => r.id === ram.id);
          this.rams[index] = ram;
          this.selectedRam = null;
        });
    }
  }

  searchRam(searchValue: string): void {
    const id = +searchValue.trim();
    if (!id) {
      return;
    }
    this.ramService.getRam(id)
      .subscribe((ram: Ram) => this.rams = [ram]);
  }


  //
  // updateRam(ram: Ram): void {
  //   // @ts-ignore
  //   this.ramService.updateRam(ram)
  //     .subscribe(() => {
  //       this.rams = this.rams.filter(r => r !== ram);
  //       this.rams.push(ram);
  //     });
  // }

  onEditSubmit(): void {
    if (!this.editingRam) {
      return;
    }
    this.ramService.updateRam(this.editingRam.id, this.editingRam)
      .subscribe(() => {
        const index = this.rams.findIndex(r => r.id === this.editingRam?.id);
        if (index >= 0) {
          this.rams[index] = this.editingRam!;
        }
        this.editingRam = null;
      });
  }

  updateRam(ram: Ram): void {
    this.editingRam = ram;
  }

  deleteRam(ram: Ram): void {
    this.ramService.deleteRam(ram.id)
      .subscribe(() => {
        this.rams = this.rams.filter(r => r !== ram);
        if (this.editingRam === ram) {
          this.editingRam = null;
        }
      });
  }
}
