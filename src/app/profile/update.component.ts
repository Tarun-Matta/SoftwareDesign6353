﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

@Component({ templateUrl: 'update.component.html' })
export class UpdateComponent implements OnInit {
    account = this.accountService.accountValue;
    form: FormGroup;
    loading = false;
    submitted = false;
    deleting = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            userName: [this.account.userName, Validators.required],
            fullname: [this.account.fullname, Validators.required],
            address1: [this.account.address1, Validators.required],
            address2: [this.account.address2, [Validators.required]],
            city: [this.account.city, [Validators.required]],
            state: [this.account.state, [Validators.required]],
            zipcode: [this.account.zipcode, [Validators.required]],
            password: ['', [Validators.minLength(6)]],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        // this.submitted = true;

        // // reset alerts on submit
        // this.alertService.clear();

        // // stop here if form is invalid
        // if (this.form.invalid) {
        //     return;
        // }

        // this.loading = true;
        // this.accountService.update(this.account.id, this.form.value)
        //     .pipe(first())
        //     .subscribe({
        //         next: () => {
        //             this.alertService.success('Update successful', { keepAfterRouteChange: true });
        //             this.router.navigate(['../'], { relativeTo: this.route });
        //         },
        //         error: error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         }
        //     });
    }

    onDelete() {
        if (confirm('Are you sure?')) {
            this.deleting = true;
            this.accountService.delete(this.account.id)
                .pipe(first())
                .subscribe(() => {
                    this.alertService.success('Account deleted successfully', { keepAfterRouteChange: true });
                });
        }
    }
}