import React from 'react'

export default function Payment() {
    const handlePay = async (event)=>{
        event.preventDefault();
        let data = {name:event.target.name.value,email:event.target.email.value,phone:event.target.phone.value,amount:event.target.amount.value};
        console.log(data);
        
        let res = await fetch(`http://localhost:9002/pay`, {
            method: "POST", body: JSON.stringify(data), headers: {
                'Content-Type': 'application/json'
            },
        });
        
        data = await res.json();
        console.log(data);
    }
    return (
        <>
            <div class="row my-5">
                <div class="col-md-4 offset-md-4">
                    <div class="card">
                        <div class="card-body">
                            <form onSubmit={handlePay}  >
                            <div class="form-group">
                                <label for="payname">Name: </label>
                                <input class="form-control" type="text" name="name" id = "payname"/>
                            </div>
                            <div class="form-group">
                                <label for="payemail">Email: </label>
                                <input class="form-control" type="text" id = "payemail" name="email" />
                            </div>
                            <div class="form-group">
                                <label for="payphone">Phone: </label>
                                <input class="form-control" type="text" id = "payphone" name="phone" />
                            </div>
                                <div class="form-group">
                                <label for="payamount">Amount: </label>
                                <input class="form-control" type="text" id = "payamount" name="amount" />
                            </div>
                            <div class="form-group">
                                <button class="btn form-control btn-primary">Pay Now</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
