import React, {Component} from 'react';
import { Button, FocusStyleManager, Spinner } from "@blueprintjs/core";
import Callout from '../components/Callout';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTabValidation} from '../actions/registration';
import {push} from 'react-router-redux';
import {pushSubFormToDB} from '../utils';
import * as constants from '../constants';
import {prevActionTabChange} from '../actions/registration';


FocusStyleManager.onlyShowFocusOnTabs();

class TnC extends Component {
  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
    this.tabs = ["sellerInfo","taxDetails","paymentDetails","POCDetails","addInfo"];
    this.state = { showCallout: null, showSpinner: false };
  }

  submitForm() {
    // let formObj = null;
    this.setState({showSpinner: true});
    this.props.updateTabValidation(6, true);  //Line 1.   Just like setState in react, state change is redux store also get pooled (not synch, not immediately done).  Therefore, this action's effect is not seen. Thus, excluding index 6 in Line2

    let formValidated = true;

    this.props.tabValidation.map((item,index)=>{
      if(item === null && index!==6){  // Line 2.   index 6 is TnC. The updateTabValidation actions are pooled together with
        console.log("vals",this.props.tabValidation);
        this.props.updateTabValidation(index, false);
        formValidated = false;
      }
      else if(item === false){
        formValidated = false;
      }
    })

    this.setState({ showCallout: !formValidated });

    const successHandler = () => {
      // this.setState({showSpinner: false});  Commenting this out because dispatch to /verfication unmounts this component and we cant set state of unmounted component
      this.props.dispatch(push("/verification"));
    }

    const failureHandler = () => {
      this.setState({showSpinner: false});
      console.log("Failed to write to DB (TnC)");
    }

    if(formValidated){ //Check if previous 6 tabs are valid
      const bodyObj = { registration_complete: true };
      pushSubFormToDB(constants.saveForm, bodyObj, successHandler, failureHandler);
    }
    else{
      this.setState({showSpinner: false});
    }

  }

  componentWillUnmount(){
    this.props.prevActionTabChange(this.props.currentTab);
  }

  render() {
    let visibility = (this.state.showCallout === false)?false:(this.state.showCallout === null)?false : true; // to handle null
    return(
      <div className="container">

          <div className="col" style={{width:"1000px"}}>

            <h2> Terms &amp; Conditions </h2>
            <br/>
            <p class="p1"><strong>VENDOR AGREEMENT FOR PROVISION OF E-COMMERCE SERVICES</strong></p>
            <p class="p2">&nbsp;</p>
            <p class="p2">&nbsp;</p>
            <p class="p3"><strong>This document is an electronic record in terms of Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.</strong></p>
            <p class="p3"><strong>This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations and Terms of Use for access or usage of www.prokure.it website and Prokure Mobile Application.</strong></p>
            <p class="p3">The domain name www.prokure.it (hereinafter referred to as "Website") and <strong>Prokure Mobile Application</strong> (hereinafter referred to as "Application") is owned by Cerise Internet Technologies Private Limited a company incorporated under the Companies Act, 2013 with its registered office at H-9/12, Ground Floor Malviya Nagar New Delhi 110017 India (hereinafter referred to as "Company").</p>
            <p class="p3">Your use of the Website and application and services are governed by the following terms and conditions (<strong>"Terms of Use"</strong>) as applicable to the Website and application including the applicable policies which are incorporated herein by way of reference.</p>
            <p class="p3">For the purpose of these Terms of Use, wherever the context so requires<strong> "You"</strong> or <strong>"Vendor"</strong> shall mean any natural or legal person who has agreed to become a Vendor on the Website and application by providing Registration Data while registering on the Website and application as Registered Vendor using the computer systems.</p>
            <p class="p3">When You use any of the services provided by Us through the Website and application, including but not limited to, (e.g. Marketing of Your product), You will be subject to the rules, guidelines, policies, terms, and conditions applicable to such service, and they shall be deemed to be incorporated into this Terms of Use and shall be considered as part and parcel of this Terms of Use. We reserve the right, at Our sole discretion, to change, modify, add or remove portions of these Terms of Use, at any time without any prior written notice to You. It is Your responsibility to review these Terms of Use periodically for updates / changes. Your continued use of the Website and application following the posting of changes will mean that You accept and agree to the revisions. As long as You comply with these Terms of Use, We grant You a personal, non-exclusive, non-transferable, limited privilege to sell your products on the Website and application.</p>
            <p class="p3"><strong>ACCESSING, BROWSING OR OTHERWISE USING THE SITE AS A VENDOR INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE, SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING.</strong></p>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Commencement, Term, Renewal</strong></li>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">The date of acceptance of this agreement shall be the commencement date and the agreement shall remain valid and binding for a period of one year initially and can be renewed based on the then existing Terms of Use.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Marketing Tools/Support, Products, Availability of products etc.</strong></li>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">The Vendor will keep informed at all times the Company about the availability of the products in its inventory along with detailed specifications like size, colour, texture etc. etc. as may be required of the product. Order once placed on the Company by the customer shall have to be honoured by the Vendor at all costs.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Fee/Commissions etc</strong></li>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">The Company as such shall not charge any fee for providing webspace/display on Website and application however for all such sales that are made/generated using the Website and application a commission shall be paid by the Vendor to the Company. The exact modalities of category wise commissions shall be agreed between the Company and Vendor by way of an amendment to this Agreement.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">It is expressly agreed by the parties hereto that the Company shall debit the amount of commission from the remittance to Vendor at the time of forwarding the order received from the end customer.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">The parties will endeavor to perform reconciliation of accounts/orders every 90 days.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Order, Handling, Delivery etc.</strong></li>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">Orders for the product shall be received using the Website and application and shall be forwarded to the Vendor by the Company via company seller portal/email/Telephone/Fax/Courier.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">The exact modalities of the Order, Handling and Delivery shall be agreed between the Company and Vendor by way of an amendment to this Agreement.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Covenants of Vendor</strong></li>
            </ul>
            <p class="p4">&nbsp;</p>
            <p class="p5">The Vendor hereby covenants with the Company as under :</p>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">To deliver the product of the Ordered specifications/description only including quantity and quality prescribed in the Order and there should be no instance of wrong item being delivered and/or quality issue and/or issue of Non delivery. Further, the Vendor shall maintain adequate stock/inventory of the items at all times. In case the Vendor is running out of supplies or is likely not to fulfill the Order received by the Company, it shall intimate to the Company at least 4 hours<span class="Apple-converted-space">&nbsp; </span>in advance so that notice of OUT OF STOCK for the product can be placed on the Website and application.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">Not to send any kind of promotion material or any such material, which is, derogatory to and/or adverse to the interests financial or otherwise of the Company, to the customer either along with the products supplied or in any manner whatsoever.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">Not to do any act/deal in a thing / products/goods/services which are either banned/prohibited by law or violates any of the intellectual property right of any party in respect of such product.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">The Vendor declares that it has all rights and authorisations in respect of intellectual property rights of third parties and is authorised to sale/provide/licence such products to the customer. The copy of such authorization shall be provided on demand without failure and/or protest.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">The Vendor agrees to indemnify and keep indemnified the Company from all claims/losses (including advocate fee for defending/prosecuting any case) that may arise against the Company due to acts/omission on the part of the Vendor</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">To provide to the Company, for the purpose of the creation/display on Website and application of Company, the product description, images, disclaimer, delivery time lines, price and such other details for the products to be displayed and offered for sale.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">To ensure and not to provide any description/image/text/graphic which is unlawful, illegal, intimidating, obnoxious, objectionable, obscene, vulgar, opposed to public policy, prohibited by law or morality or is in violation of intellectual property rights including but not limited to Trademark and copyright of any third party or of inaccurate, false, incorrect, misleading description or is derogatory in nature. Further it will forward the product description and image only for the product which is offered for sale through the Website and application of the Company. The Vendor agrees that in case there is violation of this covenant, it shall do and cause to be done all such acts as are necessary to prevent disrepute being caused to the Company</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">To provide full, correct, accurate and true description of the product so as to enable the customers to make an informed decision. The Vendor agrees not to provide any such description/information regarding the product which amounts to misrepresentation to the customer.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">To be solely responsible for the quality, quantity, merchantability, guarantee, warranties in respect of the products offered for sale through portal of the Company.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">At all times have access to the Internet and its email account to check the status of approved orders and will ensure prompt deliveries within the time frame mentioned herein before in the agreement.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">Provide information about the Order Status including Airway Bill Number on a daily basis.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">To raise an invoice as well as receipt of payment in the name of Customer for an amount equivalent to the amount displayed as MRP on the online store to the customer and paid by/charged to the customer.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">Not to offer any Products for Sale on the Online Store, which are prohibited for sale, dangerous, against the public policy, banned, unlawful, illegal or prohibited under the Indian laws.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">To provide satisfactory proof about the ownership/licences of all the legal rights in the Products that are offered for sale on the Online Store as and when demanded by the Company.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">To pass on the legal title, rights and ownership in the Products sold to the Customer.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">To be solely responsible for any dispute that may be raised by the customer relating to the goods, merchandise and services provided by the Vendor. No claim of whatsoever nature will be raised on the Company.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">The Vendor shall at all time during the pendency of this agreement endeavour to protect and promote the interests of the Company and ensure that third parties rights including intellectual property rights are not infringed.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">The Vendor shall at all times be responsible for compliance of all applicable laws and regulations including but not limited to Intellectual Property Rights, Local Sales Tax, Central Sales Tax, Service tax, Value added tax, Standards of Weights &amp; Measures legislation, Sale of Goods Act, Excise and Import duties, Drugs and Cosmetics Act, Drugs and Remedial Magic Act, Code of Advertising Ethics, etc.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">To provide to the Company copies of any document required by the Company for the purposes of performance of its obligations under this agreement within 48 hours of getting a written notice from the Company.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">To seek advance written approval from the Company, prior to release of any promotion/advertisement material, in so far as the same relates to services offered pursuant to the terms of this Agreement.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Warranties, Representations and Undertakings of the Vendor</strong></li>
            </ul>
            <p class="p4">&nbsp;</p>
            <p class="p5">The Vendor warrants and represents that</p>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">The signatory to the present agreement is having the right and full authority to enter into this Agreement with the Company and the agreement so executed is binding in nature.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">All obligations narrated under this Agreement are legal, valid, binding and enforceable in law against Vendor.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">There are no proceedings pending against the Vendor, which may have a material adverse effect on its ability to perform and meet the obligations under this Agreement;</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">That it is an authorized business establishment and hold all the requisite permissions, authorities, approvals and sanctions to conduct its business and to enter into present agreement with the Company.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">It shall, at all times ensure compliance with all the requirements applicable to its business and for the purposes of this agreement including but not limited to Intellectual Property Rights, Sales Tax, Central Sales Tax, Service tax, Standards of Weights &amp; Measures legislation, Sale of Goods Act, Value added tax, Excise and Import duties, etc. It further declares and Company that it has paid and shall continue to discharge all its obligations towards statutory authorities.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">That it has adequate rights under relevant laws including but not limited to various Intellectual Property Legislation(s) to enter into this Agreement with the Company and perform the obligations contained herein and that it has not violated/ infringed any intellectual property rights of any third party.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">It shall maintain details of all transaction and mark as complete / incomplete as the case may be and shall provide the same to the Company upon demand.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Rights of Company:</strong></li>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">Vendor agrees and acknowledges that the Company, at all times during the continuance of this Agreement, shall have the right to remove/block/delete any text, graphic, image(s) uploaded on the online store by the Vendor without any prior intimation to Vendor in the event the said text, image, graphic is found to be in violation of law, breach of any of the terms of this Agreement, terms and conditions of the company. In such an event, the Company reserve the right to forthwith remove/close the online store of the Vendor without any prior intimation or liability to the Vendor.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">Appropriate disclaimers and terms of use on the website and application shall be placed by the Company.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">At any time if the Company believes that the services are being utilized by the Vendor or its Customer in contravention of the terms and provisions of this Agreement, Terms and conditions of use of website and the application, the Company shall have the right either at its sole discretion or upon the receipt of a request from the legal / statutory authorities or a court order to discontinue/terminate the said service(s) to Customer or the End user as the case may be, forthwith remove/block/close the online store of the Vendor and furnish such details about the Vendor and/or its customers upon a request received from the Legal/ Statutory Authorities or under a Court order.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Indemnity</strong></li>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">The Vendor indemnifies and shall hold indemnified the Company, its partners, officers, employees, representatives, agents from and against all losses, damages, claims, suits, legal proceedings and otherwise howsoever arising from or in connection with any claim including but not limited to claim for any infringement of any intellectual property rights or any other rights of any third party or of law, concerning quality, quantity and any claim in relation to the Vendor&rsquo;s product, the breach of any of the Vendor&rsquo;s warranties, representations or undertakings or in relation to the non-fulfillment of any of its obligations under this Agreement or arising out of the Vendor infringing any applicable laws, regulations including but not limited to Intellectual Property Rights, Local Sales Tax, Central Sales Tax, Service tax, Value Added tax, The Standards of Weights &amp; Measures legislation, Excise and Import duties, etc . For the purpose of this clause reference to the Company shall also include the Mobile Operators and such other agencies through whom the Company shall make the Online Store available to the Customers.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">This article shall survive the termination or expiration of this Agreement.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Limitation of Liability</strong></li>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">The Company on the basis of representation by the Vendor is marketing the products of the Vendor on the shopping portal www.prokure.it and the Prokure Mobile Application to enable Vendor to offer the its products for sale through the said online shopping portal. This representation is the essence of the Contract. It is expressly agreed by the vendor that the Company shall under no circumstances be liable or responsible for any loss, injury or damage to the Vendor, customer or any other party whomsoever, arising on account of any transaction under this Agreement or as a result of the Products being in any way damaged, defective, in unfit condition, infringing/ violating any laws/ regulations/ intellectual property rights of any third party. The Vendor agrees and acknowledges that it shall be solely liable for any claims, damages, allegation arising out of the Products offered for sale through online shopping portal www.prokure.it and the Prokure Mobile Application (including but not limited to quality, quantity, price, merchantability, use for a particular purpose, or any other related claim) and shall hold the Company harmless and indemnified against all such claims and damages. Further the Company shall not be liable for any claims, damages arising out of any negligence, misconduct or misrepresentation by the Vendor or any of its representatives.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">The Company under no circumstances will be liable to the Vendor for loss and/or anticipated loss of profits, or for any direct or indirect, incidental, consequential, special or exemplary damages arising from the subject matter of this Agreement, regardless of the type of claim and even if the Vendor has been advised of the possibility of such damages, such as, but not limited to loss of revenue or anticipated profits or loss business, unless such loss or damages is proven by the Vendor to have been deliberately caused by the Company.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Termination and effects of Termination</strong></li>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">This Agreement may be terminated by the Company forthwith in the event</li>
            <ul class="ul1">
            <li class="li5">Vendor fails to make payment of the <strong>sum demanded</strong> after it has been served a 48 hours written notice;</li>
            </ul>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">Vendor commits a material breach of any representation, obligations, covenant, warranty or term of this agreement and the same is not cured within 30 days after written notice given by the Company.</li>
            </ul>
            </ul>
            </ul>
            <p class="p7">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">If a Petition for insolvency is filed against the Vendor.</li>
            </ul>
            </ul>
            </ul>
            <p class="p7">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">If the Vendor is in infringement of the third party rights including intellectual property rights.</li>
            </ul>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">This agreement may be terminated without reason by either party after serving upon the other, a written notice of 30 days. The agreement shall stand terminated after expiry of such period.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">Effect of Termination:</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">In the event of termination/expiry of this Agreement, the Company shall remove the Links and shall discontinue display of the Products on online shopping portal with immediate effect.</li>
            </ul>
            </ul>
            </ul>
            <p class="p7">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">Company shall not be liable for any loss or damages (direct, indirect or inconsequential) incurred by the Vendor by virtue of termination of this agreement.</li>
            </ul>
            </ul>
            </ul>
            <p class="p7">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">During the period under notice both the parties shall be bound to perform its obligations incurred under this agreement and this sub-clause shall survive the termination of this agreement.</li>
            </ul>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Jurisdiction, governing law and ex-parte Orders</strong></li>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">This agreement is subject to exclusive jurisdiction of competent Courts of law at New Delhi only.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">The laws of Republic of India, as are in force, shall be applicable to present agreement.</li>
            </ul>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">The Company is entitled to obtain ex-parte ad- interim injunction orders restraining the Vendor to prevent any loss/anticipated loss either in material terms or in terms of intellectual property or causing damage/loss/harm to reputation/goodwill of the Company by the Vendor, its representatives, associates or assigns.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Notices</strong></li>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">All notices and other communication under this Agreement shall be in writing, in English language and shall be caused to be delivered by hand or sent by telex, fax, email or courier in each case to the addresses as set out at the beginning of this Agreement.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Intellectual Property Rights</strong></li>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">The Vendor expressly authorises the Company to use its trademarks/copy rights/ designs /logos and other intellectual property owned and/or licenced by it for the purpose of reproduction on the Website and application and at such other places as the Company may deem necessary. It is expressly agreed and clarified that, except as specified agreed in this Agreement, each Party shall retain all right, title and interest in their respective trademarks and logos and that nothing contained in this Agreement, nor the use of the trademark / logos on the publicity, advertising, promotional or other material in relation to the services shall be construed as giving to any Party any right, title or interest of any nature whatsoever to any of the other Party&rsquo;s trademarks and / or logos.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Entire Agreement</strong></li>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">This Agreement embodies the entire agreement and understanding of the Parties and supersedes any and all other prior and contemporaneous agreements, correspondence, arrangements and understandings (whether written or oral) between the Parties with respect to its subject matter.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Assignment</strong></li>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">Neither this Agreement nor any part of it is assignable, transferable, sub-licensable, sub-contractable or conveyable by Vendor, either by operation of law or otherwise, without the express, prior, written consent of the Company signed by an authorized representative of such Party. The Company is at liberty to refuse such consent.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Confidentiality:</strong></li>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">The contents of the agreement and any information passed on by the Company to the Vendor is highly confidential in nature and the Vendor agrees and undertakes to maintain the confidentiality of the information and user/customer data disclosed, generated or made available to Vendor under this Agreement. The said information shall not be used by the Vendor or its agents, servants, representatives or any person acting through or claiming through the Vendor for any purpose other than for the performance of its obligations under this Agreement. The Vendor agrees that the unauthorized disclosure or use of such information would cause irreparable harm and significant injury, the degree of which may be difficult to ascertain. Accordingly, Vendor agrees that the Company shall have the right to obtain an immediate injunction from any court of law ensuing breach of this Agreement and/or disclosure of the Confidential Information. The Company shall also have the right to pursue any other rights or remedies available at law or equity for such a breach.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Relationship of Parties</strong></li>
            </ul>
            <p class="p6">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">Nothing in this Agreement will be construed as creating a relationship of partnership, joint venture, agency or employment between the Parties. The Company shall not be responsible for the acts or omissions of the Vendor and Vendor shall not represent the Company, neither has, any power or authority to speak for, represent, bind or assume any obligation on behalf of the Company.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Waiver and Amendment</strong></li>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">No waiver of any breach of any provision of this Agreement constitutes a waiver of any prior, concurrent or subsequent breach of the same or any other provisions, and will not be effective unless made in writing and signed by an authorised representative of the waiving Party.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">Except as expressly set out in this Agreement, no amendment is binding on the Parties unless it is in writing and signed by a duly authorized representative of each of the Parties.</li>
            </ul>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <li class="li5"><strong>Force Majeure</strong></li>
            </ul>
            <p class="p4">&nbsp;</p>
            <ul class="ul1">
            <ul class="ul1">
            <li class="li5">Neither Party shall be responsible or liable for any delay or failure to perform its obligations (other than an obligation to make payment) under this Agreement due to unforeseen circumstances or any event which is beyond that Party's reasonable control and without its fault or negligence, but not limited to, acts of God, war, riots, embargoes, strikes, lockouts, acts of any Government authority, delays in obtaining licenses or rejection of applications under the Statutes, failure of telephone connections or power failure, fire or floods.</li>
            </ul>
            </ul>

            <Callout text={"Please complete previous steps"} visible={ visibility }/>
            <br/>
            <Button className="pt-intent-primary" style={{margin:"auto"}} onClick={this.submitForm}>I Accept</Button>
            <br/>
            {(this.state.showSpinner)?<div style={{margin: "auto", marginTop:"10px"}}><Spinner className="pt-small"/></div>:null}
          </div>

        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tabValidation: state.tabValidation,
    currentTab : state.registrationCurrentTab
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({prevActionTabChange, updateTabValidation, dispatch}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TnC);
