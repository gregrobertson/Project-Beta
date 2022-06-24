# CarCar

Team:

* Person 1 - Spencer - Sales
* Person 2 - Greg - Services

## Design
When a user opens the site, from the homepage, they should have dropdowns to each category of stuff that they have access to; services, sales, and inventory.

Off of the services dropdown, they should be able to:

- Create a Technician
- Show a list of Technicians 
- Show Appointments
- Create an Appointment
- Show Appointment History

Off of the sales dropdown, they should be able to:

- Create a New Salesperson
- Create a New Customer
- Create a New Sales Record
- Show a Sales List
- Get the Sales History of a Salesperson

Off of the inventory dropdown, they should be able to:

- Show Manufacturers
- Create Manufacturers
- Show Vehicle Models
- Create Vehicle Models
- Show Automobiles
- Create Automobiles
## Service microservice

There are 2 primary models in the Service microservice and 1 model to bridge between the Inventory microservice. The Technician model simply handles the technicians name and employee number. The Service model (The service appointment for the vehicle) handles the bulk of the information be passed on behalf of the Service microservice (VIN#, customer name, date/time, technician who is handling that particular service call, whether the client is a VIP(bought from the dealership) or not, and if the appointment is finished) Last there is the AutombileVO model which links this microservice with the Inventory microservice, it handle just the VIN# which is then linked uniquely to one vehicle and all of the information associated with that vehicle. I.E. Customer name and the make, model and year of the vehicle.
## Sales microservice

